/* eslint-disable no-unused-vars */

type TEntity = {
    entityType: 'customer' | 'supplier' | 'shipper' | 'storage' | 'costClearance' | 'landTransport' | 'localTransport';
    name: string;
    address1: string;
    address2?: string;
    address3?: string;
    phone: string;
    email: string;
    taxId?: string;
    loadingPort?: string;
    dischargePort?: string;
    country: string;
}
export default TEntity;
