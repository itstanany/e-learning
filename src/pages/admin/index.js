/**
 * Admin Dashboard placeholder
 */
import React from 'react';
import { AdminDashboard } from '../../components/AdminDashboard';
import { adminEditorAccess, protectPage } from '../../utils/server';

function Admin() {
  return (
    <AdminDashboard />
  );
}

const getSSProps = () => ({ props: {} });

export const getServerSideProps = protectPage(adminEditorAccess(getSSProps));

export default (Admin);
