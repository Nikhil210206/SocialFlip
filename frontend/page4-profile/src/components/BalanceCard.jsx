import {
  FiFileText,
  FiArrowDownCircle,
  FiTag,
} from "react-icons/fi";

function BalanceCard({ title, amount }) {

  const icons = {
    Earned: <FiFileText />,
    Withdrawn: <FiArrowDownCircle />,
    Available: <FiTag />,
  };

  return (
    <div className="border border-gray-200 rounded-lg px-4 py-4 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="text-gray-500 text-lg">
          {icons[title]}
        </div>

        <span className="text-gray-600 text-sm">
          {title}
        </span>

      </div>

      <span className="text-xl font-semibold text-gray-800">
        {amount}
      </span>

    </div>
  );
}

export default BalanceCard;