import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const InvoiceTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Dossier de: </Text>
    <Text>Nom :{invoice.consultations[0].users[0].name}</Text>
    <Text>Prenom :{invoice.consultations[0].users[0].username}</Text>
    <Text>Sexe :{invoice.consultations[0].users[0].sexe}</Text>
    <Text>
      Date de naissance :{invoice.consultations[0].users[0].datenaissance}
    </Text>
    <Text>Adresse :{invoice.consultations[0].users[0].adresse}</Text>
    <Text>Telephone :{invoice.consultations[0].users[0].tel}</Text>
    <Text>E-mail :{invoice.consultations[0].users[0].email}</Text>
    <Text style={styles.billTo}>
      Apres de different analyse de consultatation on a trouve sa maladie :{" "}
      {invoice.consultations[0].maladie}
    </Text>
    <Text>
      La date sa consultation est le{" "}
      {invoice.consultations[0].date_consultation} et on obient le resultat{" "}
      {invoice.consultations[0].resultat}
    </Text>

    <Text>Medicament :{invoice.medicament}</Text>
    <Text>Medicament :{invoice.nombre_medicament}</Text>
    <Text>Durée de traitement :{invoice.duree_traitement}</Text>
    <Text>Mode de traitement :{invoice.mode_traitement}</Text>
    <Text>Observation :{invoice.observation}</Text>
  </View>
);

export default InvoiceTo;
