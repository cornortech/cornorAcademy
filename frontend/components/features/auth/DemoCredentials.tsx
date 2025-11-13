import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DemoCredentials = () => {
  return (
    <Card className="mt-4 border-border/50 bg-card/30 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Demo Credentials</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs text-muted-foreground">
        <div>
          <strong>Student:</strong> student@demo.com / password
        </div>
        <div>
          <strong>Teacher:</strong> teacher@demo.com / password
        </div>
        <div>
          <strong>Admin:</strong> admin@demo.com / password
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoCredentials;
