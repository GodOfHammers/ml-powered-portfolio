export const PageHeader = ({ title, description }) => (
  <div className="mb-12">
    <h1 className="text-4xl font-bold text-teal-400 mb-4">{title}</h1>
    {description && <p className="text-gray-300">{description}</p>}
  </div>
);