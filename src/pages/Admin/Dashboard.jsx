import React from "react";
import coffeeItemsData from "../../data/coffeeItems.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getColumns } from "@components/Dashboard/Columns";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";

const Dashboard = () => {
  const [coffeeItems, setCoffeeItems] = React.useState(
    coffeeItemsData.coffeeItems
  );
  const [newItem, setNewItem] = React.useState({
    name: "",
    description: "",
    price: 0,
    numberOfItems: 0,
  });
  const addCoffeeItem = () => {
    setCoffeeItems([...coffeeItems, { ...newItem, id: Date.now() }]);
    setNewItem({ name: "", description: "", price: 0, numberOfItems: 0 });
  };

  const removeCoffeeItem = (id) => {
    setCoffeeItems(coffeeItems.filter((item) => item.id !== id));
  };

  const updateCoffeeItem = (id, updatedFields) => {
    setCoffeeItems(
      coffeeItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  const columns = getColumns(removeCoffeeItem, updateCoffeeItem);

  const table = useReactTable({
    data: coffeeItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCoffeeItem();
  };

  return (
    <section>
      <div className="relative select-none">
        <div className="flex justify-between items-center">
          <h3 className="text-left font-bold text-2xl">Manage your coffee</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Coffee</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add Coffee</DialogTitle>
                  <DialogDescription className="py-2">
                    Make changes to your coffee stock here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Coffee Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Expresso"
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      value={newItem.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      placeholder="description"
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      value={newItem.description}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      placeholder="$10.00"
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      value={newItem.price}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="numberOfItems"
                      placeholder="10"
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          numberOfItems: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      value={newItem.numberOfItems}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border my-5">
          <Table className="bg-white">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="font-medium">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-left">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
