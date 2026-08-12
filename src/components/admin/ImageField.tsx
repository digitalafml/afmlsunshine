import { useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

/** Uploads to the private site-images bucket and stores a long-lived signed URL. */
const ImageField = ({ label, value, onChange }: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }
    setBusy(true);
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file, {
      contentType: file.type,
    });
    if (error) {
      setBusy(false);
      toast.error(error.message);
      return;
    }
    const { data, error: signError } = await supabase.storage
      .from("site-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    setBusy(false);
    if (signError || !data) {
      toast.error(signError?.message ?? "Could not create image link");
      return;
    }
    onChange(data.signedUrl);
    toast.success("Image uploaded");
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt={label} className="h-16 w-16 rounded-lg object-contain bg-muted p-1" />
        ) : null}
        <div className="flex-1 space-y-2">
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Image URL" />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.target.value = "";
            }}
          />
          <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? "Uploading..." : "Upload image"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageField;
