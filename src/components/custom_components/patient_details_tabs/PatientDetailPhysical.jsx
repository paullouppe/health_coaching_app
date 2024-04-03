import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import WeightChangeGraph from "../graphs/WeightChangeGraph";
import TimeSpentPerActivity from "../graphs/TimeSpentPerActivity";

function PatientDetailPhysical({ data }) {

    return (
        <>
            Patient detail physical
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <WeightChangeGraph/>
                    </CarouselItem>
                    <CarouselItem>
                        <TimeSpentPerActivity/>
                    </CarouselItem>
                    <CarouselItem>
                        ??? unknown graph for now
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}

export default PatientDetailPhysical;
