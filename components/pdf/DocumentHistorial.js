import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Helvetica',
    marginTop: 30,
    padding: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a202c',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#4a5568',
  },
  section: {
    marginBottom: 10,
    backgroundColor: '#F6E05E',
    padding: 10,
    borderRadius: 5,
  },
  sectionobs: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#BCBDD1',
    borderRadius: 5,
  },
  sectionFather: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#1a202c',
  },
  subsubtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#4a5568',
  },
  subtext: {
    fontSize: 12,
    marginBottom: 5,
    color: '#1a202c',
  },
})

const VeterinaryPDF = ({
  pet: { name = '', breed = '', weight = '' } = {},
  client: { name: clientName = '', phone: clientPhone = '', dni = '' } = {},
  citation: {
    dateOfAttention = '',
    hourOfAttention = '',
    services = '',
    nameVet = '',
  } = {},
  observation = '',
}) => {
  console.log(services)
  return (
    <Document>
      <Page>
        <View style={styles.container}>
          <Text style={styles.title}>Veterinaria Orejotas y Colitas</Text>
          <View style={styles.section}>
            <Text style={styles.subsubtitle}>
              Información de la veterinaria
            </Text>
            <Text style={styles.subtext}>RUC: 20607050999</Text>
            <Text style={styles.subtext}>Teléfono: (01) 2741810</Text>
            <Text style={styles.subtext}>
              Correo: orejotasycolitas@gmail.com
            </Text>
            <Text style={styles.subtext}>
              Dirección: Calle Loma de las Gardenias Mz. X4 Lote 7 Surco - Lima,
              Provincia de Lima
            </Text>
          </View>
          <View style={styles.sectionFather}>
            <View style={styles.section}>
              <Text style={styles.subsubtitle}>Propietario de la mascota</Text>
              <Text style={styles.subtext}>Nombre: {clientName}</Text>
              <Text style={styles.subtext}>Teléfono: {clientPhone}</Text>
              <Text style={styles.subtext}>DNI: {dni}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subsubtitle}>Mascota</Text>
              <Text style={styles.subtext}>Nombre: {name}</Text>
              <Text style={styles.subtext}>Raza: {breed}</Text>
              <Text style={styles.subtext}>Peso: {weight} kg</Text>
            </View>
          </View>
          <View style={styles.sectionobs}>
            <Text style={styles.subsubtitle}>Información de la cita</Text>
            <Text style={styles.subtext}>Fecha: {dateOfAttention}</Text>
            <Text style={styles.subtext}>Hora: {hourOfAttention}</Text>
            <Text style={styles.subtext}>Servicios: {services}</Text>
            <Text style={styles.subtext}>Veterinario: {nameVet}</Text>
          </View>
          <View style={styles.sectionobs}>
            <Text style={styles.subsubtitle}>Observación de la cita</Text>
            <Text style={styles.subtext}>{observation}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default VeterinaryPDF
