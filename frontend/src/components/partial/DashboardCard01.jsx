import React from "react";
import { Shirt } from "lucide-react";

function DashboardCard01() {
  return (
		<div className='flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-blue-600 shadow-sm rounded-xl'>
			<div className='px-5 py-5 flex gap-4 items-center divide-x-2'>
				<div className='w-16 h-16 bg-white rounded-full flex justify-center items-center text-blue-600 text-2xl'>
					<Shirt />
				</div>
				<div className='px-4'>
					<header className='flex justify-between items-start'>
						<h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2'>
							Products
						</h2>
					</header>
					<div className='flex items-start'>
						<div className='text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2'>
							480
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardCard01;
