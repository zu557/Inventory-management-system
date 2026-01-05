// components/modals/UserCreateModal.tsx
import RegisterForm from "@/components/forms/RegisterForm";
import { UserPlus, Shield, Mail, Lock } from "lucide-react";

type Props = {
  onClose: () => void;
  onCreated: (user: { email: string; password: string; name: string; role: string }) => void;
};

export default function UserCreateModal({ onClose, onCreated }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Illustration & Info */}
        <div className="hidden md:block md:w-5/12 bg-gradient-to-br from-blue-500 to-indigo-600 p-10 text-white">
          <div className="h-full flex flex-col justify-center items-center text-center space-y-8">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <UserPlus className="w-16 h-16 text-white" />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Add a New Team Member</h3>
              <p className="text-blue-100 text-lg">
                Create an account for your staff, manager, or admin with the appropriate role.
              </p>
              
              <div className="space-y-4 text-left bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>Secure email-based login</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span>Auto-generated strong password</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span>Role-based access control</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - The Form */}
        <div className="w-full md:w-7/12 p-8 md:p-10 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create New User</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <RegisterForm
            onSuccess={onCreated}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}