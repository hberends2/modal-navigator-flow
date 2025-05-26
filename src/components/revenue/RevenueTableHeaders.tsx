
import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

const RevenueTableHeaders = () => {
  return (
    <TableHeader>
      {/* Period Headers */}
      <TableRow>
        <TableHead className="w-48 px-1"></TableHead>
        <TableHead className="text-center bg-blue-50 px-1" colSpan={4}>Historical</TableHead>
        <TableHead className="text-center bg-green-50 px-1">Year 1</TableHead>
        <TableHead className="text-center bg-green-50 px-1">Year 2</TableHead>
        <TableHead className="text-center bg-green-50 px-1">Year 3</TableHead>
        <TableHead className="text-center bg-green-50 px-1">Year 4</TableHead>
        <TableHead className="text-center bg-green-50 px-1">Year 5</TableHead>
      </TableRow>
      {/* Year Headers */}
      <TableRow>
        <TableHead className="w-48 px-1">Metric</TableHead>
        <TableHead className="text-center bg-blue-50 px-1">2021</TableHead>
        <TableHead className="text-center bg-blue-50 px-1">2022</TableHead>
        <TableHead className="text-center bg-blue-50 px-1">2023</TableHead>
        <TableHead className="text-center bg-blue-50 px-1">2024</TableHead>
        <TableHead className="text-center bg-green-50 px-1">2025</TableHead>
        <TableHead className="text-center bg-green-50 px-1">2026</TableHead>
        <TableHead className="text-center bg-green-50 px-1">2027</TableHead>
        <TableHead className="text-center bg-green-50 px-1">2028</TableHead>
        <TableHead className="text-center bg-green-50 px-1">2029</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default RevenueTableHeaders;
