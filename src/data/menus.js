import { AllUsersIcon, DashboardIcon, List3Icon, ListIcon, ListViewIcon, PendingUsersIcon, PlusIcon } from "@/assets/icons";

export const menus = {
    Admin: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Pending Users', path: '/pending-users', icon: <PendingUsersIcon /> },
      { label: 'All Crops List', path: '/all-crops', icon: <ListIcon /> },
      { label: 'All Foods List', path: '/all-foods', icon: <ListViewIcon /> },
      { label: 'All Distributions List', path: '/all-distributions', icon: <ListIcon /> },
      { label: 'All Retail List', path: '/view-retails', icon: <List3Icon /> },
      { label: 'All Users', path: '/all-users', icon: <AllUsersIcon /> },
    ],
    Farmer: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Add Crops', path: '/add-crops', icon: <PlusIcon /> }, ,
      { label: 'My Crops', path: '/my-crops', icon: <List3Icon /> },

    ],
    Producer: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Add Foods', path: '/add-foods', icon: <PlusIcon /> },
      { label: 'My Foods List', path: '/my-foods', icon: <ListViewIcon /> },
      { label: 'View All Crops', path: '/view-crops', icon: <ListIcon /> },
      { label: 'All Distributions List', path: '/all-distributions', icon: <List3Icon /> },
      { label: 'All Retail List', path: '/view-retails', icon: <ListIcon /> },
    ],
    Distributor: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Add Distribution', path: '/add-distribute', icon: <PlusIcon /> },
      { label: 'All Foods List', path: '/view-foods', icon: <List3Icon /> },
      { label: 'My Distributions List', path: '/my-distributions', icon: <ListViewIcon /> },
    ],
    Retailer: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Distributions List', path: '/view-distributions', icon: <ListViewIcon /> },
      { label: 'Add Retail', path: '/add-retail', icon: <PlusIcon /> },
      { label: 'My Retails List', path: '/my-retails', icon: <ListIcon /> },

    ],
  };