import { useEffect, useState } from "react";
import { getPeople } from "../services/health_api";
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

function Home() {
    const [allPatients, setAllPatients] = useState([]); // New state to keep the original list of patients
    const [displayPatients, setDisplayPatients] = useState([]); // This state will be used to display patients
    const [searchInput, setSearchInput] = useState("");
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        if (searchInput.length > 0) {
            const filteredPatients = allPatients.filter((patient) => {
                return patient.firstname.toLowerCase().match(searchInput.toLowerCase()) || patient.lastname.toLowerCase().match(searchInput.toLowerCase());
            });
            setDisplayPatients(filteredPatients);
        } else {
            setDisplayPatients(allPatients); // If search input is cleared, show all patients again
        }
    }, [searchInput, allPatients]);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };


    //----------------------------- RENDERING -----------------------------
    if (hasErrors) {
        return (<div>Errors</div>)
    }

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading ...
            </div>)
    }

    return (
        <>
            <div className="container mx-auto px-4">

                <header className="flex items-centerd mt-5 mb-5">
                    <img className="w-10 h-10" src="./public/logo_app.png"></img>
                    <h1 className="text-center text-4xl ml-3">Body Boost</h1>
                    <Sheet>
                        <SheetTrigger className="ml-auto mt-1">
                            <img className="w-8 h-6" src="src/assets/menu_icon.svg"></img>
                        </SheetTrigger>
                        
                        <SheetContent className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                                <SheetTitle className="text-xl">Menu</SheetTitle>
                                <SheetDescription>
                                    <Link className="flex items-centerd ml-10 mt-10" to={"/profile"}>
                                        <img className="w-7 h-7" src="src/assets/profil_icon.svg"></img>
                                        <p className="text-center ml-3 text-lg">Profil</p>
                                    </Link>
                                    <Link className="flex items-centerd ml-10 mt-10" to={"/settings"}>
                                        <img className="w-7 h-7" src="src/assets/setting_icon.svg"></img>
                                        <p className="text-center ml-3 text-lg">Setting</p>
                                    </Link>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </header>


                <div className="flex w-full max-w-sm items-center space-x-2 mb-5">
                    <Input onChange={handleSearchChange} value={searchInput} type="search" placeholder="Search..." />
                    <Button type="submit">
                        <img src="src/assets/search_logo.png"></img>
                    </Button>
                </div>

                {displayPatients.length === 0 ? (
                <div className="text-center py-5">
                    <p>No results found.</p>
                </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {displayPatients.map((p, index) => (
                      <div key={index}>
                          <Link to={"/patient/" + p.id}>
                              <Card className="flex items-center transition-transform active:scale-95">
                                  <img className="ml-4 w-10 h-10" src={p.icon}></img>
                                  <CardHeader>
                                      <CardTitle><span className="uppercase">{p.lastname}</span> {p.firstname}</CardTitle>
                                      <CardDescription>
                                          <Badge className="capitalize text-neutral-500	" variant="secondary">{p.activityProfile}</Badge>
                                      </CardDescription>
                                  </CardHeader>
                              </Card>
                          </Link>
                      </div>
                  ))}
              </div>
            )}

            </div>
        </>
    )
}

export default Home
