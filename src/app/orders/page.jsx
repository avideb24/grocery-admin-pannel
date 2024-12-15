"use client";

import PageLoading from "@/components/layout/Loadings/PageLoading/PageLoading";
import PageTitle from "@/components/layout/PageTitle/PageTitle";
import Wrapper from "@/components/layout/Wrapper/Wrapper";
import OrdersTable from "@/components/pages/Orders/OrdersTable/OrdersTable";
import Header from "@/components/shared/Header/Header";
import { getOrders } from "@/libs/Orders/getOrders";
import React, { useEffect, useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

const OrdersPage = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // all status for order
  const allStatus = [
    "pending",
    "accepted",
    "declined",
    "processing",
    "outOfDelivery",
    "delivered",
    "canceled",
  ];

  // laod order data
  useEffect(() => {
    setLoading(true);

    const queryData = {
      page: currentPage,
      limit: 10,
      orderStatus: orderStatus,
    };

    const fetchOrders = async () => {
      const res = await getOrders(queryData);

      if (res.success) {
        setOrders(res);
        setTotalPages(Math.ceil(res.totalRows / 10));
      }
      setLoading(false);
    };

    fetchOrders();
  }, [currentPage, orderStatus]);

  // page change fn
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <PageTitle title={"Orders"} />
      <Header title={"Orders"} />

      <Wrapper>
        {/* title and filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 pb-5">
          <h2 className="font-bold">
            Total Orders: {orders?.totalRows ? orders?.totalRows : "0"}
          </h2>
          {/* filter by status */}
          <div>
            <label htmlFor="status" className="font-semibold pr-2">
              Filter By Status:
            </label>
            <select
              onChange={(e) => setOrderStatus(e.target.value)}
              id="status"
              className="bg-primary-bg dark:bg-secondary-bg px-3 py-1 border border-slate-300 dark:border-slate-500 rounded-md outline-none cursor-pointer capitalize"
              defaultValue={"all"}
            >
              <option value="">All</option>
              {allStatus?.map((status, idx) => (
                <option key={idx} value={status}>
                  {status == "outOfDelivery" ? "Out Of Delivery" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <PageLoading />
        ) : (
          <>
            {/* order data table */}
            <OrdersTable orders={orders?.data} allStatus={allStatus} />

            {/* pagination btns */}
            {totalPages > 1 && (
              <div className="flex justify-end items-center gap-2 pt-4 pb-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="text-blue-500 text-lg md:text-2xl"
                  disabled={currentPage == 1}
                >
                  <BsArrowLeftSquareFill />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 mx-1 border rounded-md ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="text-blue-500 text-lg md:text-2xl"
                  disabled={currentPage === totalPages}
                >
                  <BsArrowRightSquareFill />
                </button>
              </div>
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default OrdersPage;
