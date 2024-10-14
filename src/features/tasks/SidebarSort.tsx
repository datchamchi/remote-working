import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HiClock, HiOutlineUserCircle } from "react-icons/hi2";
import { GiProgression } from "react-icons/gi";

type SidebarSortProps = {
  listFilter: string[];
  setListFilter: React.Dispatch<React.SetStateAction<string[]>>;
};
const SidebarSort = ({ listFilter, setListFilter }: SidebarSortProps) => {
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
        { name: "To do", id: "todo" },
        { name: "On-going", id: "ongoing" },
        { name: "Done", id: "done" },
        { name: "All", id: "all" },
      ],
    },
    {
      name: "Type",
      icon: <HiOutlineUserCircle />,
      types: [
        {
          name: "Asssign to me",
          id: "myself",
        },
        // { name: "In project", id: "myproject" },
      ],
    },
  ];
  return (
    <Accordion type="multiple" className="col-span-1 px-4 shadow-lg">
      {listSort.map((sort, index) => (
        <AccordionItem value={sort.name} key={sort.name}>
          <AccordionTrigger className="text-md gap-2 font-semibold hover:no-underline focus:no-underline">
            {/* {sort.icon} */}
            <span>{sort.name}</span>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              defaultValue={listFilter[index]}
              onValueChange={(value) =>
                setListFilter((curList) => {
                  const newList = [...curList];
                  newList[index] = value;
                  return newList;
                })
              }
            >
              {sort.types.map((type) => (
                <div key={type.id} className="mt-4 flex items-center gap-4">
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
