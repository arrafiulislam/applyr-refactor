import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';

const SuccessModal = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    
    navigate(routes.studentDashboard); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center relative"
      >
        
        <div className="bg-blue-50 rounded-full h-32 w-32 mx-auto flex items-center justify-center mb-6">
          <FaCheck className="text-blue-600 text-6xl" />
        </div>

       
        <h1 className="text-blue-600 font-bold text-4xl mb-2">Success</h1>
        <p className="text-[#404F5E] text-lg mb-6">
        Congatulations, your account has been successfully created.
        </p>

        
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-lg text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
