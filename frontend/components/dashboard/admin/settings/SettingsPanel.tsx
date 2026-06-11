"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SettingsPanel() {
  const { settings, loading, updateSettings } = useSettings();
  const [saving, setSaving] = useState(false);

  const [platformName, setPlatformName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [allowRefunds, setAllowRefunds] = useState(true);
  const [requireCertificate, setRequireCertificate] = useState(true);
  const [autoArchive, setAutoArchive] = useState(false);
  const [currency, setCurrency] = useState("npr");
  const [taxRate, setTaxRate] = useState(0);

  useEffect(() => {
    if (settings) {
      setPlatformName(settings.platformName || "");
      setSupportEmail(settings.supportEmail || "");
      setSupportPhone(settings.supportPhone || "");
      setFacebookUrl(settings.facebookUrl || "");
      setInstagramUrl(settings.instagramUrl || "");
      setAllowRefunds(settings.allowRefunds);
      setRequireCertificate(settings.requireCertificate);
      setAutoArchive(settings.autoArchive);
      setCurrency(settings.currency || "npr");
      setTaxRate(settings.taxRate || 0);
    }
  }, [settings]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading settings...</span>
      </div>
    );
  }

  const handleSave = async (section: string) => {
    setSaving(true);
    try {
      await updateSettings({
        platformName,
        supportEmail,
        supportPhone,
        facebookUrl,
        instagramUrl,
        allowRefunds,
        requireCertificate,
        autoArchive,
        currency,
        taxRate: Number(taxRate),
      });
      toast.success(`${section} updated successfully!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">System Settings</h3>
        <p className="text-muted-foreground">
          Configure platform settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-base">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input
                id="platform-name"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-email">Support Email</Label>
              <Input
                id="platform-email"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-phone">Support Phone</Label>
              <Input
                id="platform-phone"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook-url">Facebook URL</Label>
              <Input
                id="facebook-url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram-url">Instagram URL</Label>
              <Input
                id="instagram-url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                disabled={saving}
              />
            </div>
            <Button onClick={() => handleSave("General Settings")} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-base">Course Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Allow Course Refunds</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow students to refund within 30 days
                  </p>
                </div>
                <Switch
                  checked={allowRefunds}
                  onCheckedChange={setAllowRefunds}
                  disabled={saving}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Require Certificate</Label>
                  <p className="text-sm text-muted-foreground">
                    Students must complete 80% to get certificate
                  </p>
                </div>
                <Switch
                  checked={requireCertificate}
                  onCheckedChange={setRequireCertificate}
                  disabled={saving}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Auto-Archive Completed</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically archive completed courses
                  </p>
                </div>
                <Switch
                  checked={autoArchive}
                  onCheckedChange={setAutoArchive}
                  disabled={saving}
                />
              </div>
            </div>
            <Button onClick={() => handleSave("Course Settings")} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-base">Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={currency} onValueChange={setCurrency} disabled={saving}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="npr">NPR (Rs.)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax">Platform Tax Rate (%)</Label>
              <Input
                id="tax"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                disabled={saving}
              />
            </div>
            <Button onClick={() => handleSave("Payment Settings")} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
