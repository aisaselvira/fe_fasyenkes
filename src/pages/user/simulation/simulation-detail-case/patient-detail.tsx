"use client";

import {useState, useEffect} from "react";
import {PatientSimulationTemplate} from "@/components/template/user/simulation/patient-simulation";
import {simulationData} from "@/lib/simulation-data";

export default function Home() {
    const [registrationData] = useState([
        {
            id: "1",
            waktuAdmisi: "20 Feb 2023 07:31",
            nama: "BAGAS KIKI, SDR I.I. | 09/09/13 | 13-05-2007",
            noHP: "087234567876",
            alamat: "NGADISURYAN KP 2 RT 6 RW 10, KRATON, YOGYAKARTA, DIY",
            admisiKe: "Poliklinik Saraf",
            jenisAsuransi: "BPJS",
        },
        {
            id: "2",
            waktuAdmisi: "20 Feb 2023 07:31",
            nama: "BAGAS ADI MARUF, SDR I.I. | 09/09/13 | 13-05-2007",
            noHP: "089876789876",
            alamat: "SENDOWO, SINDUADI, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
            admisiKe: "Poliklinik Mata",
            jenisAsuransi: "BPJS",
        },
        {
            id: "3",
            waktuAdmisi: "20 Feb 2023 07:32",
            nama: "HANA FIKRI, RP I.I. | 09/09/13 | 13-05-2007",
            noHP: "081345643345",
            alamat: "POGUNG LOR RT 3 RW 7, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
            admisiKe: "Poliklinik Jantung",
            jenisAsuransi: "BPJS",
        },
        {
            id: "4",
            waktuAdmisi: "20 Feb 2023 07:32",
            nama: "INSANIYAH MAHARANI, NN I.I. | 09/09/13 | 13-05-2007",
            noHP: "087675456782",
            alamat: "POGUNG KIDUL RT 2 RW 5, CATURTUNGGAL, DEPOK, SLEMAN, DIY",
            admisiKe: "Poliklinik Dalam",
            jenisAsuransi: "BPJS",
        },
    ]);

    // Reset timer when navigating away (simulated with useEffect cleanup)
    useEffect(() => {
        return () => {
            // This will run when component unmounts (navigating away)
            console.log("Page navigation - timer reset");
        };
    }, []);

    return <PatientSimulationTemplate simulationData={simulationData} registrationData={registrationData} />;
}
