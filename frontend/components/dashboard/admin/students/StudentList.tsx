import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudentDialog } from "./StudentDialog";
import { DeleteConfirmDialog } from "../shared/DeleteConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StudentListProps {
  students: any[];
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}

export function StudentList({
  students,
  onUpdate,
  onDelete,
}: StudentListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="p-0">
        <div className="space-y-0">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-4 border-b border-border/50 last:border-b-0 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={student.avatar || "/placeholder.svg"}
                    alt={student.name}
                  />
                  <AvatarFallback>
                    {student.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {student.email}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant={
                        student.status === "active" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {student.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {student.uid}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {student.courses} courses
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {student.city}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {/* View Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{student.name} - Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Name
                            </p>
                            <p className="font-medium">{student.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Email
                            </p>
                            <p className="font-medium">{student.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              phoneNumber
                            </p>
                            <p className="font-medium">{student.phoneNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              status
                            </p>
                            <Badge>{student.status}</Badge>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              City
                            </p>
                            <p className="font-medium">{student.city}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Country
                            </p>
                            <p className="font-medium">{student.country}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Edit Dialog */}
                  <StudentDialog
                    open={editingId === student.id}
                    onOpenChange={(open) => !open && setEditingId(null)}
                    onSubmit={(data) => {
                      onUpdate(student.id, data);
                      setEditingId(null);
                    }}
                    initialData={student}
                    mode="edit"
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(student.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />

                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletingId(student.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <DeleteConfirmDialog
                    open={deletingId === student.id}
                    onOpenChange={(open) => !open && setDeletingId(null)}
                    title="Delete Student"
                    description={`Are you sure you want to delete ${student.name}? This action cannot be undone.`}
                    onConfirm={() => {
                      onDelete(student.id);
                      setDeletingId(null);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
