import React from 'react';
import DashboardCard01 from '../../../components/partial/DashboardCard01';
import DashboardCard02 from '../../../components/partial/DashboardCard02';
import DashboardCard03 from '../../../components/partial/DashboardCard03';

const Dashboard = () => {
  return (
		<div className='px-2 py-8 w-full max-w-9xl mx-auto'>
			{/* Dashboard actions */}
			<div className='sm:flex sm:justify-between sm:items-center mb-8 bg-black p-4 rounded-md'>
				<div className='mb-4 sm:mb-0'>
					<h1 className='text-xl md:text-3xl text-white font-bold'>
						Dashboard
					</h1>
				</div>
			</div>
			{/* Cards */}
			<div className='grid grid-cols-12 gap-6'>
				<DashboardCard01 />
				<DashboardCard02 />
				<DashboardCard03 />
			</div>
		</div>
	);
}

export default Dashboard