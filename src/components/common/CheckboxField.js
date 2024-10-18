const CheckboxField = ({ label, checked = false, name, onChange }) => {
  return (
    <label className="flex items-start input-checkbox-label">
      <input
        type="checkbox"
        name={name}
        className="appearance-none w-4 h-4 rounded-[4px] border border-utility-gray-400 checked:text-white checked:border-transparent accent-blue-20 transition duration-150 ease-in-out focus:ring-0 focus:outline-none checked:bg-blue-40 cursor-pointer relative flex-shrink-0"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};
export default CheckboxField;
