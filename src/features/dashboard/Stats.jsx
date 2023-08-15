import React from "react";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, cabinCount, numDays }) => {
  // 1. Bookings
  const numBookings = bookings.length;

  // 2. Sales
  const sales = bookings.reduce((acc, val) => acc + val.totalPrice, 0);

  //3. Check ins
  const checkins = confirmedStays.length;

  // 4. Occupancy rate

  const occupation =
    confirmedStays.reduce((acc, val) => acc + val.numNights, 0) /
    (numDays * cabinCount);

  // total nights guests stays in

  // num days * cabins

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;
