"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register font
Font.register({
  family: "Montserrat",
  src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
});

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10, fontFamily: "Montserrat" },
  section: { padding: 12, border: "1 solid black", borderBottom: 0 },
  halfSection: {
    width: "50%",
    padding: 12,
    border: "1 solid black",
    borderBottom: 0,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  NestedSection: {
    border: "0",
    padding: 12,
  },
  header: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  bold: { fontWeight: "bold" },
  tableHeader: {
    borderBottom: "1 solid black",
    marginBottom: 4,
    paddingBottom: 2,
  },
  tableRow: { flexDirection: "row", justifyContent: "space-between" },
});

const PayrollPDF = ({ payrollData }: { payrollData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Pay Advice</Text>
      <View style={styles.section}>
        <Text>Employee Name: {payrollData.name}</Text>
        <Text>Employee ID: {payrollData.id}</Text>
        <Text>Pay Period: {payrollData.payPeriod}</Text>
        <Text>Pay Date: {payrollData.payDate}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <View style={styles.halfSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.bold}>Earnings & Allowances</Text>
            <View>
              <Text>INR</Text>
            </View>
          </View>
          {payrollData.earnings.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text>{item.type}</Text>
              <Text>{item.amount}</Text>
            </View>
          ))}
        </View>

        <View style={{ ...styles.halfSection, borderLeft: 0 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.bold}>Deductions</Text>
            <View>
              <Text>INR</Text>
            </View>
          </View>
          {payrollData.deductions.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text>{item.type}</Text>
              <Text>{item.amount}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <View style={styles.halfSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.bold}>Reimbursements</Text>
          </View>
          {payrollData.earnings.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text>{item.type}</Text>
              <Text>{item.amount}</Text>
            </View>
          ))}
        </View>

        <View style={{ ...styles.halfSection, padding: 0, borderLeft: 0 }}>
          <View
            style={{ ...styles.NestedSection, borderBottom: "1 solid black" }}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.bold}>Pay Summary</Text>
              <View>
                <Text>INR</Text>
              </View>
            </View>
            {payrollData.deductions.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text>{item.type}</Text>
                <Text>{item.amount}</Text>
              </View>
            ))}
          </View>
          <View style={styles.NestedSection}>
            <View>
              {payrollData.deductions.map((item: any, index: number) => (
                <View key={index} style={styles.tableRow}>
                  <Text>{item.type}</Text>
                  <Text>{item.amount}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={{ ...styles.section, borderBottom: "1 solid black" }}>
        <Text style={styles.bold}>Net Pay: {payrollData.netPay} INR</Text>
      </View>
    </Page>
  </Document>
);

export default PayrollPDF;
