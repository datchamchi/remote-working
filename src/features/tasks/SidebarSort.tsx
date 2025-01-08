import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HiClock } from "react-icons/hi2";
import { GiProgression } from "react-icons/gi";
import { useSearchParams } from "react-router-dom";

const listSort = [
  {
    name: "Time",
    icon: <HiClock />,
    types: [
      { name: "Deadline", id: "deadline" },
      {
        name: "Create Recently",
        id: "recently",
      },
    ],
  },
  {
    name: "Status",
    icon: <GiProgression />,
    types: [
      { name: "All", id: "all" },
      { name: "To do", id: "todo" },
      { name: "Done", id: "done" },
      { name: "Overdue", id: "overdue" },
    ],
  },
];
const SidebarSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Accordion
      type="multiple"
      className="col-span-1 px-4 shadow-lg"
      defaultValue={["Time", "Status", "Type"]}
    >
      {listSort.map((sort) => (
        <AccordionItem value={sort.name} key={sort.name}>
          <AccordionTrigger className="text-md gap-2 font-semibold hover:no-underline focus:no-underline">
            <span>{sort.name}</span>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              defaultValue={
                sort.name == "Time"
                  ? (searchParams.get("time") ?? "")
                  : (searchParams.get("type") ?? "")
              }
            >
              {sort.types.map((type) => (
                <div
                  key={type.id}
                  className="mt-4 flex items-center gap-4"
                  onClick={() =>
                    sort.name == "Time"
                      ? setSearchParams({
                          ...Object.fromEntries(searchParams),
                          time: type.id,
                        })
                      : setSearchParams({
                          ...Object.fromEntries(searchParams),
                          type: type.id,
                        })
                  }
                >
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id}>{type.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SidebarSort;
