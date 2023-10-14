import React,{useEffect,useState} from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
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
      marginTop:3,
      marginBottom:3,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#000',
      padding: 5,
      textAlign:'center'
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
      fontWeight: 'bold',
    },
    textWithPadding: {
      marginTop: 3, 
      marginBottom: 3,
      fontSize: 13 
    },
    boldText: {
      fontWeight: 'bold',
    },
  });
  const GenerateInvoice = () => {
    const location = useLocation();
    const id = location.state.id;
    const token = localStorage.getItem('token');
    const [printContent, setprintContent] = useState([]);
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const apiUrl = `http://127.0.0.1:8000/api/invoice/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      axios.get(apiUrl, config)
        .then((response) => {
          // console.log('API Response:', response.data.data);
          setprintContent(response.data.data);
          setproducts(response.data.data.products);
         // console.log(response.data.data.products);
         setLoading(false);
        })
        .catch((error) => {
          console.error('API Error:', error);
          setLoading(false);
        });
    }, [id, token]);
    
    return (
      <div className='home'>
        {
          loading? 
          <div>
          <ClipLoader
            color={'#022888'}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="centered-loader"
          /></div>
          : (        <div>
            <PDFViewer width={500} height={600}>
              <Document>
                <Page size="legal" style={styles.page}>
                  <View style={styles.header}>
                    <Text>Invoice</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.textWithPadding}>Invoice Number: {id}</Text>
                    <Text style={styles.textWithPadding}>Invoice Date: {printContent.created_date}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.textWithPadding}>Shop Name: Malik Bedsheet,Parda Cloth & Bag House</Text>
                    <Text style={styles.textWithPadding}>Address: Rajba Road Near Mandar Sita Raam, Faisalabad</Text>
                    <Text style={styles.textWithPadding}>Contacts: 0300-6643047, 0304-1668462</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.textWithPadding}>Customer Details:</Text>
                    <Text style={styles.textWithPadding}>Name: {printContent.cust_name}</Text>
                    <Text style={styles.textWithPadding}>Number: {"0"+printContent.cust_number}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.textWithPadding}>Products:</Text>
                    <View style={styles.table}>
                      <View style={[styles.tableRow, styles.tableHeader]}>
                      <Text style={[styles.tableCell,styles.textWithPadding]}>Sr#</Text>
                        <Text style={[styles.tableCell,styles.textWithPadding]}>Description</Text>
                        <Text style={[styles.tableCell,styles.textWithPadding]}>Quantity</Text>
                        <Text style={[styles.tableCell,styles.textWithPadding]}>Price</Text>
                      </View>
                      {products.map((product, index) => (
                        <View key={index} style={styles.tableRow}>
                          <Text style={[styles.tableCell,styles.textWithPadding]}>{index+1}</Text>
                          <Text style={[styles.tableCell,styles.textWithPadding]}>{product.prod_name}</Text>
                          <Text style={[styles.tableCell,styles.textWithPadding]}>{product.quantity}</Text>
                          <Text style={[styles.tableCell,styles.textWithPadding]}>Rs {parseInt(product.prod_selling_price)}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.textWithPadding}>Total Products: {printContent.total_products}</Text>
                    <Text style={styles.textWithPadding}>Total Quantity: {printContent.total_quantity}</Text>
                    <Text style={styles.textWithPadding}>Total : Rs {printContent.total_price}</Text>
    
                  </View>
                </Page>
              </Document>
            </PDFViewer>
            </div>)
        }

      </div>
    );
  };
  
  export default GenerateInvoice;