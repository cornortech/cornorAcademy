import { useState } from "react";
import { Eye, Edit, Trash2, ShieldCheck, ShieldX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeacherDialog } from "./TeacherDialog";
import { DeleteConfirmDialog } from "../shared/DeleteConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TeacherListProps {
  teachers: any[];
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
  onToggleApproval: (id: string, current: boolean) => void;
}

export function TeacherList({
  teachers,
  onUpdate,
  onDelete,
  onToggleApproval,
}: TeacherListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="p-0">
        <div className="space-y-0">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex items-center justify-between p-4 border-b border-border/50 last:border-b-0 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={teacher.avatar || "/placeholder.svg"}
                    alt={teacher.name}
                  />
                  <AvatarFallback>
                    {teacher.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{teacher.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {teacher.email}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {teacher.noOfYearsExperience} years
                    </Badge>
                    <Badge
                      variant={teacher.isApproved ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {teacher.isApproved ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {teacher.courses} courses
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {teacher.expertise.split(",")[0]}
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
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{teacher.name} - Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Name
                            </p>
                            <p className="font-medium">{teacher.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Email
                            </p>
                            <p className="font-medium">{teacher.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Experience
                            </p>
                            <p className="font-medium">
                              {teacher.noOfYearsExperience} years
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Status
                            </p>
                            <Badge>{teacher.status}</Badge>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Bio</p>
                            <p className="font-medium">{teacher.bio}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Edit Dialog */}
                  <TeacherDialog
                    open={editingId === teacher.id}
                    onOpenChange={(open) => !open && setEditingId(null)}
                    onSubmit={(data) => {
                      onUpdate(teacher.id, data);
                      setEditingId(null);
                    }}
                    initialData={teacher}
                    mode="edit"
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(teacher.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />

                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletingId(teacher.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <DeleteConfirmDialog
                    open={deletingId === teacher.id}
                    onOpenChange={(open) => !open && setDeletingId(null)}
                    title="Delete Teacher"
                    description={`Are you sure you want to delete ${teacher.name}? This action cannot be undone.`}
                    onConfirm={() => {
                      onDelete(teacher.id);
                      setDeletingId(null);
                    }}
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleApproval(teacher.id, teacher.isApproved)}
                    title={teacher.isApproved ? "Revoke verification" : "Verify teacher"}
                  >
                    {teacher.isApproved ? (
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <ShieldX className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
