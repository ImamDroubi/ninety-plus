import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialWithdrawRequestsData = [
  {
    id: 1,
    teacherId: 1,
    teacherName: "مونكي دي لوفي",
    amount: 1200,
    paymentMethod: "Visa",
  },
  {
    id: 2,
    teacherId: 2,
    teacherName: "رورونوا زورو",
    amount: 1500,
    paymentMethod: "Bank Account",
  },
  {
    id: 3,
    teacherId: 3,
    teacherName: "إدواردو ألريك",
    amount: 2100,
    paymentMethod: "PayPal",
  },
];

const WithdrawSection = () => {
  const [withdrawRequests, setWithdrawRequests] = useState(
    initialWithdrawRequestsData
  );
  const [completedRequests, setCompletedRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleApprove = (request) => {
    setWithdrawRequests(withdrawRequests.filter((r) => r.id !== request.id));
    setCompletedRequests([
      ...completedRequests,
      { ...request, status: "Approved" },
    ]);
    toast.success(
      `Withdraw request for ${request.teacherName} has been approved.`
    );
  };

  const handleReject = (request) => {
    setWithdrawRequests(withdrawRequests.filter((r) => r.id !== request.id));
    setCompletedRequests([
      ...completedRequests,
      { ...request, status: "Rejected" },
    ]);
    toast.error(
      `Withdraw request for ${request.teacherName} has been rejected.`
    );
  };

  const paginatedRequests = withdrawRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(withdrawRequests.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">طلبات السحب</h1>

      <div className="flex justify-end mb-4">
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={withdrawRequests.length}>الكل</option>
        </select>
      </div>

      <h2 className="text-xl font-bold text-center my-4">
        طلبات السحب الجديدة
      </h2>

      <table className="table-auto w-full shadow-lg bg-white mb-6">
        <thead className=" bg-primary-500 text-warning-100">
          <tr>
            <th className="px-4 py-2">رقم المعلم</th>
            <th className="px-4 py-2">اسم المعلم</th>
            <th className="px-4 py-2">المبلغ</th>
            <th className="px-4 py-2">طريقة الدفع</th>
            <th className="px-4 py-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRequests.map((request) => (
            <tr key={request.id}>
              <td className="border px-4 py-2">{request.teacherId}</td>
              <td className="border px-4 py-2">{request.teacherName}</td>
              <td className="border px-4 py-2">${request.amount}</td>
              <td className="border px-4 py-2">{request.paymentMethod}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleApprove(request)}
                  className="bg-green-500 hover:bg-green-700  text-success-500 font-bold py-2 px-4 rounded mr-2"
                >
                  موافقة
                </button>
                <button
                  onClick={() => handleReject(request)}
                  className="bg-red-500 hover:bg-red-700  text-error-500 font-bold py-2 px-4 rounded"
                >
                  رفض
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
        >
          السابق
        </button>
        <span className="px-4 py-2 mx-1">
          صفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
        >
          التالي
        </button>
      </div>

      <h2 className="text-xl font-bold text-center my-4">
        طلبات السحب المكتملة
      </h2>

      <table className="table-auto w-full shadow-lg bg-white">
        <thead className=" bg-primary-500 text-warning-100">
          <tr>
            <th className="px-4 py-2">رقم المعلم</th>
            <th className="px-4 py-2">اسم المعلم</th>
            <th className="px-4 py-2">المبلغ</th>
            <th className="px-4 py-2">طريقة الدفع</th>
            <th className="px-4 py-2">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {completedRequests.map((request) => (
            <tr key={request.id}>
              <td className="border px-4 py-2">{request.teacherId}</td>
              <td className="border px-4 py-2">{request.teacherName}</td>
              <td className="border px-4 py-2">${request.amount}</td>
              <td className="border px-4 py-2">{request.paymentMethod}</td>
              <td className="border px-4 py-2">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default WithdrawSection;
