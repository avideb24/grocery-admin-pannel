"use client";

import LinkButton from "@/components/shared/Buttons/LinkButton/LinkButton";
import { showAlertWithTheme } from "@/components/theme/Alert/AlertTheme";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { TiArrowRightThick } from "react-icons/ti";
import { FaDownload } from "react-icons/fa";
import AxiosPublic from "@/libs/Axios/AxiosPublic";

const OrdersTable = ({ orders, allStatus }) => {
  const axiosPublic = AxiosPublic();
  const tableRef = useRef(null);

  // change order status fn
  const handleChangeStatus = async (e, orderId) => {
    const isDarkMode = localStorage.getItem("theme") == "dark";

    const query = {
      orderStatus: e.target.value,
    };

    const res = await axiosPublic.patch(`/api/order/update/${orderId}`, query);

    if (res.data.success) {
      showAlertWithTheme(
        {
          position: "top-end",
          icon: "success",
          title: "Updated!",
          showConfirmButton: false,
          timer: 1500,
        },
        isDarkMode
      );

      // reload page
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      showAlertWithTheme(
        {
          position: "top-end",
          icon: "error",
          title: "Something Went Wrong!",
          showConfirmButton: false,
          timer: 1500,
        },
        isDarkMode
      );
    }
  };

  return (
    <>
      {orders?.length == 0 ? (
        <div className="my-10 text-center font-bold">No Order Found!</div>
      ) : (
        <>
          {/* exel download btn */}
          <div className="flex justify-end">
            <DownloadTableExcel
              filename="order table"
              sheet="orders"
              currentTableRef={tableRef.current}
            >
              <button className="flex items-center gap-1 bg-primary-color text-secondary-text font-semibold px-3 py-1 rounded-md mb-3 text-xs">
                <FaDownload />
                <span>Download Exel</span>
              </button>
            </DownloadTableExcel>
          </div>

          {/* order table for exel export */}
          <table ref={tableRef} className="absolute opacity-0 w-0 h-0">
            <thead>
              <tr>
                <th>SL</th>
                <th>OrderId</th>
                <th>Placed Date</th>
                <th>Delivery Date</th>
                <th>Customer Name</th>
                <th>Customer Mobile</th>
                <th>Item Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{order?.id}</td>
                  <td>
                    {order?.createdAt
                      ? order?.createdAt
                          ?.slice(0, 10)
                          ?.split("-")
                          ?.reverse()
                          ?.join("-")
                      : ""}
                  </td>
                  <td>
                    {order?.deliveryDate
                      ? order?.deliveryDate
                          ?.slice(0, 10)
                          ?.split("-")
                          ?.reverse()
                          ?.join("-")
                      : ""}
                  </td>
                  <td>{order?.user?.name}</td>
                  <td>{order?.user?.mobile}</td>
                  <td>{order?.orderItems?.length}</td>
                  <td>৳{order?.totalAmount}</td>
                  <td>{order?.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* order data table */}
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    SL
                  </th>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    OrderId
                  </th>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    Dates
                  </th>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    Customer Info
                  </th>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    Item Quantity
                  </th>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    Total Amount
                  </th>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    Status
                  </th>
                  <th className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1 border border-slate-300 dark:border-slate-500">
                      {idx + 1}
                    </td>
                    <td className="w-48 break-all px-3 py-1 border border-slate-300 dark:border-slate-500">
                      {order?.id}
                    </td>
                    <td className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                      Placed:{" "}
                      {order?.createdAt
                        ? order?.createdAt
                            ?.slice(0, 10)
                            ?.split("-")
                            ?.reverse()
                            ?.join("-")
                        : ""}
                      <br />
                      Delivery:{" "}
                      {order?.deliveryDate
                        ? order?.deliveryDate
                            ?.slice(0, 10)
                            ?.split("-")
                            ?.reverse()
                            ?.join("-")
                        : ""}
                    </td>
                    <td className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                      {order?.user?.name} <br />
                      {order?.user?.mobile}
                    </td>
                    <td className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                      {order?.orderItems?.length}
                    </td>
                    <td className="px-1 py-2 border border-slate-300 dark:border-slate-500">
                      ৳{order?.totalAmount} <br />({order?.paymentStatus})
                    </td>
                    <td className="px-1 py-2 border border-slate-300 dark:border-slate-500 capitalize">
                      <p
                        className={`${
                          order?.orderStatus === "pending"
                            ? "text-sky-500"
                            : order?.orderStatus === "accepted"
                            ? "text-blue-600"
                            : order?.orderStatus === "declined"
                            ? "text-red-600"
                            : order?.orderStatus === "proccessing"
                            ? "text-orange-600"
                            : order?.orderStatus === "outOfDelivery"
                            ? "text-purple-600"
                            : order?.orderStatus === "delivered"
                            ? "text-green-600"
                            : order?.orderStatus === "canceled"
                            ? "text-red-500"
                            : ""
                        } font-bold`}
                      >
                        {order?.orderStatus == "outOfDelivery"
                          ? "Out Of Delivery"
                          : order?.orderStatus}
                      </p>
                      {/* change status */}
                      <select
                        onChange={(e) => handleChangeStatus(e, order?.id)}
                        id="status"
                        className="bg-primary-bg dark:bg-secondary-bg px-3 py-1 border border-slate-300 dark:border-slate-500 rounded-md outline-none cursor-pointer capitalize mt-2 text-center"
                        defaultValue={order?.orderStatus}
                      >
                        <option value="all">All</option>
                        {allStatus?.map((status, idx) => (
                          <option key={idx} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-3 py-2 border border-slate-300 dark:border-slate-500">
                      <LinkButton
                        linkTo={`/orders/${order?.id}`}
                        btnText={"Details"}
                        icon={TiArrowRightThick}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default OrdersTable;
