import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

//  LOGIN
export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//  AUTH STATE CHANGED
export const getCurrentUser = async () => {
  // getting data from localStorage
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
};

//  LOGOUT
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

// UPDATE USER

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  // 1. Update password or fullName

  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) {
    return data;
  }

  // 2. Upload avatar image

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // 3. Update avatar in the user

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser;
};
