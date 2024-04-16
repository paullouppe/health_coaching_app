import { useEffect, useState } from "react";
import { getPeople } from "../services/health_api";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import Errors from './functional_pages/Errors'
import PatientCard from "../components/custom_components/PatientCard"
import { Search } from "lucide-react";
import BodyBoostTitle from "@/components/custom_components/BodyBoostTitle";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth";
import { CircleUserRound } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/utils/ModeToggle";


function Home() {
  const navigate = useNavigate();

  const [allPatients, setAllPatients] = useState([]); // New state to keep the original list of patients
  const [displayPatients, setDisplayPatients] = useState([]); // This state will be used to display patients
  const [searchInput, setSearchInput] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //first load useEffect
  useEffect(() => {
    getPeople()
      .then((data) => {
        const sortedPatients = data.sort((a, b) => {
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

  const logUserOut = () => {
    logout();
    return navigate("/");
  }


  //----------------------------- RENDERING -----------------------------
  if (hasErrors) {
    return (<Errors />)
  }

  function renderList() {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(50).keys()].map((i, index) => (
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

        <header className="flex items-center mt-5 mb-5 justify-between">
          <div className="flex items-center gap-2">
            <img className="w-7 h-7" src="http://localhost:5173/images/logo_app.png"></img>
            <BodyBoostTitle />
          </div>
          <Sheet>
            <SheetTrigger>
              <CircleUserRound className="cursor-pointer" color="#3A52ED" size={28} />
            </SheetTrigger>
            <SheetContent>
              <ModeToggle className="absolute top-0 left-0" />
              <SheetHeader>
                <SheetTitle className="mt-2"><BodyBoostTitle /></SheetTitle>
              </SheetHeader>
              <div className="flex h-5/6 flex-col mt-5 justify-between">
                <div className="flex flex-col gap-2">
                  <Button className="w-full" variant="outline" onClick={() => navigate('/dashboard')}>My dashboard</Button>
                  <Button className="w-full" variant="outline">Parameters</Button>
                </div>
                <Button onClick={logUserOut}> Disconnect </Button>
              </div>
            </SheetContent>
          </Sheet>

        </header>

        <div className="flex w-full max-w-sm items-center space-x-2 mb-5">
          <Input onChange={handleSearchChange} value={searchInput} type="search" startIcon={Search} placeholder="Search" />
        </div>

        {renderList()}

      </div>
    </>
  )
}

export default Home
