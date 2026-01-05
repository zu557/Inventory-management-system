'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import {
  Home,
  Package,
  History,
  Users,
  Building2,
  Tags,
  PlusCircle,
  AlertCircle,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';

type Role = 'admin' | 'manager' | 'staff';

const MENU = {
  admin: [
    { href: '/admin', label: 'Admin Home', icon: Home },
    { href: '/admin/users', label: 'Manage Users', icon: Users },
    { href: '/admin/suppliers', label: 'Suppliers', icon: Building2 },
    { href: '/admin/categories', label: 'Categories', icon: Tags },
    { href: '/admin/inventory', label: 'All Inventory', icon: Package },
    { href: '/stock-movements', label: 'Stock History', icon: History },
    { href: '/inventory/low-stock', label: 'Low Stock Alert', icon: AlertCircle },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ],
  manager: [
    { href: '/manager', label: 'Manager Home', icon: Home },
    { href: '/inventory', label: 'Inventory', icon: Package },
    { href: '/inventory/add', label: 'Add Stock', icon: PlusCircle },
    { href: '/manager/approvals', label: 'Stock Requests', icon: FileText },
    { href: '/manager/reports', label: 'Reports', icon: FileText },
    { href: '/stock-movements', label: 'Stock History', icon: History },
  ],
  staff: [
    { href: '/staff', label: 'My Dashboard', icon: Home },
    { href: '/inventory', label: 'View Inventory', icon: Package },
    { href: '/staff/requests/new', label: 'Request Stock', icon: PlusCircle },
    { href: '/staff/requests', label: 'My Requests', icon: History },
  ],
} as const;

function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = MENU[role];

  const isActive = useCallback(
    (href: string) => {
      if (href === '/admin' || href === '/manager' || href === '/staff') {
        return pathname === href;
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Replace with your actual logout URL or logic
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-3 border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Package className="w-7 h-7" />
          StockPro
        </h1>
        {/* <p className="text-sm font-bold text-gray-400 mt-2 capitalize">
          {role} Panel
        </p> */}
        <p className="text-sm font-bold text-gray-400 mt-2 capitalize">
          {role === 'staff' ? 'Staff' : role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 p-3 space-y-1">
        <Link
          href="/profile"
          className={`
            flex items-center gap-3 px-4 py-1 rounded-lg transition-all
            ${isActive('/profile')
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }
          `}
        >
          <Settings className="w-5 h-5" />
          <span>Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-gray-800 disabled:opacity-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
}

export default memo(Sidebar);