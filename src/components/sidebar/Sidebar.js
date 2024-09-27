// components/Sidebar.js
import Link from 'next/link';

const Sidebar = ({ role }) => {
  // Define different menus for each role
  const menus = {
    admin: [
      { label: 'User Management', path: '/admin/user-management' },
      { label: 'System Settings', path: '/admin/system-settings' },
    ],
    farmer: [
      { label: 'Add Crops', path: '/farmer/add-crops' },
      { label: 'View Crops', path: '/farmer/view-crops' },
    ],
    producer: [
      { label: 'Create Food Item', path: '/producer/create-food' },
      { label: 'Manage Food Items', path: '/producer/manage-food' },
    ],
    distributor: [
      { label: 'Distribute Food', path: '/distributor/distribute-food' },
      { label: 'View Distributions', path: '/distributor/view-distributions' },
    ],
    retailer: [
      { label: 'View Products', path: '/retailer/view-products' },
      { label: 'Manage Sales', path: '/retailer/manage-sales' },
    ],
  };

  const menuItems = menus[role];

  return (
    <aside className="sidebar">
      <ul>
        {menuItems &&
          menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
