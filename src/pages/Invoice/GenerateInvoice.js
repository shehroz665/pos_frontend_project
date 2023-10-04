import React,{useEffect} from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
const invoiceData = {
  invoiceNumber: '2023001',
  invoiceDate: '01/10/2023',
  sender: {
    company: 'Malik Bag House',
    address: 'P-26 Regal Road',
    zip: '12345',
    city: 'Faisalabad',
    country: 'Pakistan',
  },
  client: {
    company: 'Shehroz',
    address: '03016036804',
    zip: '12345',
    city: 'Faisalabad',
    country: 'Pakistan',
  },
  products: [
    {
      description: 'Product 1',
      quantity: 2,
      price: 10,
    },
    {
      description: 'Product 2',
      quantity: 3,
      price: 15,
    },
  ],
  bottomNotice: 'Thank you for your business!',
};

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      padding: 20,
    },
    section: {
      margin: 10,
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      borderTopWidth: 1,
      borderColor: '#000',
      textAlign: 'center',
      padding: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#000',
      padding: 5,
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
      fontWeight: 'bold',
    },
  });
  const GenerateInvoice = () => {
    const location = useLocation();
    const id = location.state.id;
    return (
      <div className='home'>
        <PDFViewer width={500} height={600}>
          <Document>
            <Page size="legal" style={styles.page}>
              <View style={styles.header}>
                <Text>Invoice</Text>
              </View>
              <View style={styles.section}>
                <Text>Invoice Number: {'I#'+id}</Text>
                <Text>Invoice Date: {invoiceData.invoiceDate}</Text>
              </View>
              <View style={styles.section}>
                <Text>Sender:</Text>
                <Text>{invoiceData.sender.company}</Text>
                <Text>{invoiceData.sender.address}</Text>
                <Text>{invoiceData.sender.zip}, {invoiceData.sender.city}, {invoiceData.sender.country}</Text>
              </View>
              <View style={styles.section}>
                <Text>Client:</Text>
                <Text>{invoiceData.client.company}</Text>
                <Text>{invoiceData.client.address}</Text>
                <Text>{invoiceData.client.zip}, {invoiceData.client.city}, {invoiceData.client.country}</Text>
              </View>
              <View style={styles.section}>
                <Text>Products:</Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={styles.tableCell}>Description</Text>
                    <Text style={styles.tableCell}>Quantity</Text>
                    <Text style={styles.tableCell}>Price</Text>
                  </View>
                  {invoiceData.products.map((product, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{product.description}</Text>
                      <Text style={styles.tableCell}>{product.quantity}</Text>
                      <Text style={styles.tableCell}>{product.price}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.section}>
                <Text>Bottom Notice:</Text>
                <Text>{invoiceData.bottomNotice}</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    );
  };
  
  export default GenerateInvoice;