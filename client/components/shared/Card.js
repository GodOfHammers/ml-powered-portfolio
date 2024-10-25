export const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 ${className}`}>
    {children}
  </div>
);