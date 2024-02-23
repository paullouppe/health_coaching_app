import { useEffect, useState } from "react";
import { getPeople } from "../services/health_api";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Errors from './functional_pages/Errors'
import PatientCard from "../components/custom_components/PatientCard"

function Home() {
    const [allPatients, setAllPatients] = useState([]); // New state to keep the original list of patients
    const [displayPatients, setDisplayPatients] = useState([]); // This state will be used to display patients
    const [searchInput, setSearchInput] = useState("");
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //first load useEffect
    useEffect(() => {
        getPeople()
            .then((data) => {
                const sortedPatients = data.data.sort((a, b) => {
                    const lastNameComparison = a.lastname.localeCompare(b.lastname);
                    if (lastNameComparison !== 0) {
                        return lastNameComparison;
                    }
                    return a.firstname.localeCompare(b.firstname);
                });
                setAllPatients(sortedPatients);
                setDisplayPatients(sortedPatients);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setHasErrors(true);
            });
    }, []);

    //search input useEffect
    useEffect(() => {
        if (searchInput.length > 0) {
            const filteredPatients = allPatients.filter((patient) => {
                return patient.firstname.toLowerCase().match(searchInput.toLowerCase()) ||
                  patient.lastname.toLowerCase().match(searchInput.toLowerCase()) ||
                  patient.activityProfile.toLowerCase().match(searchInput.toLowerCase())
            });
            setDisplayPatients(filteredPatients);
        } else {
            setDisplayPatients(allPatients);
        }
    }, [searchInput, allPatients]);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };


    //----------------------------- RENDERING -----------------------------
    if (hasErrors) {
        return (<Errors/>)
    }

    function renderList() {
      if (isLoading) {
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {[...Array(12).keys()].map((i, index) => (
              <PatientCard key={index} />
            ))}
          </div>
        );
      } else if (displayPatients.length === 0) {
        return (
          <div className="text-center py-5">
            <p>No results found.</p>
          </div>
        );
      } else {
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {displayPatients.map((p, index) => (
              <PatientCard key={index} patientData={p} />
            ))}
          </div>
        );
      }
    }

    return (
      <>
          <div className="container mx-auto px-4">

              <header className="flex items-center mt-5 mb-5">
                  <img className="w-10 h-10" src="./public/logo_app.png"></img>
                  <h1 className="text-center text-4xl ml-3">Body Boost</h1>
              </header>

              <div className="flex w-full max-w-sm items-center space-x-2 mb-5">
                  <img className="relative left-0" src="src/assets/search_logo.svg" />
                  <Input onChange={handleSearchChange} value={searchInput} type="search" placeholder="Search..." />
              </div>

              {renderList()}

          </div>
      </>
    )
}

export default Home
