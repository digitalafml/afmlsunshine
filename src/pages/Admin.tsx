import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash2, LogOut, Save, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useSiteContent } from "@/hooks/useSiteContent";
import { SiteContent, defaultContent, parseYouTubeId } from "@/content/siteContent";
import { hexToHsl, hslToHex } from "@/lib/color";
import ImageField from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const themeFields: { key: keyof SiteContent["theme"]; label: string }[] = [
  { key: "primary", label: "Primary (Sunshine Yellow)" },
  { key: "secondary", label: "Secondary (Akij Red)" },
  { key: "accent", label: "Accent" },
  { key: "sunshineGold", label: "Sunshine Gold" },
  { key: "akijRed", label: "Akij Red highlight" },
  { key: "background", label: "Page background" },
  { key: "foreground", label: "Text color" },
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAdminAuth();
  const { content, save, refresh } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saving, setSaving] = useState(false);

  useEffect(() => setDraft(content), [content]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  const update = useMemo(
    () =>
      <K extends keyof SiteContent>(section: K, values: Partial<SiteContent[K]>) =>
        setDraft((prev) => ({ ...prev, [section]: { ...prev[section], ...values } })),
    []
  );

  const handleSave = async () => {
    setSaving(true);
    const { error } = await save(draft);
    setSaving(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Website updated");
  };




  if (loading) {
    return <main className="min-h-screen grid place-items-center text-muted-foreground">Loading...</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Admin access required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This account ({user?.email}) does not have admin access. Please contact the site owner.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => supabase.auth.signOut()}>
                Sign out
              </Button>
            </div>

          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="font-serif text-xl md:text-2xl">Website Admin</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setDraft(defaultContent)}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              View site
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                await refresh();
                navigate("/auth");
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="theme" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="theme">Colors</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="adverts">Adverts</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
          </TabsList>

          {/* THEME */}
          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Brand colors</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                {themeFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label>{field.label}</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={hslToHex(draft.theme[field.key])}
                        onChange={(e) => update("theme", { [field.key]: hexToHsl(e.target.value) } as Partial<SiteContent["theme"]>)}
                        className="h-10 w-14 cursor-pointer rounded border bg-transparent"
                        aria-label={field.label}
                      />
                      <Input
                        value={hslToHex(draft.theme[field.key])}
                        onChange={(e) => update("theme", { [field.key]: hexToHsl(e.target.value) } as Partial<SiteContent["theme"]>)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* HERO */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero text</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Line 1</Label>
                  <Input value={draft.hero.line1} onChange={(e) => update("hero", { line1: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Line 1 highlight</Label>
                  <Input value={draft.hero.highlight1} onChange={(e) => update("hero", { highlight1: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Line 2</Label>
                  <Input value={draft.hero.line2} onChange={(e) => update("hero", { line2: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Line 2 highlight</Label>
                  <Input value={draft.hero.highlight2} onChange={(e) => update("hero", { highlight2: e.target.value })} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Subtitle</Label>
                  <Textarea value={draft.hero.subtitle} onChange={(e) => update("hero", { subtitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Primary button</Label>
                  <Input value={draft.hero.primaryCta} onChange={(e) => update("hero", { primaryCta: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Secondary button</Label>
                  <Input value={draft.hero.secondaryCta} onChange={(e) => update("hero", { secondaryCta: e.target.value })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background videos (muted slider)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {draft.hero.videos.map((video, i) => (
                  <div key={`hero-video-${i}`} className="flex gap-2">
                    <Input
                      value={video}
                      placeholder="YouTube link or ID"
                      onChange={(e) => {
                        const videos = [...draft.hero.videos];
                        videos[i] = parseYouTubeId(e.target.value);
                        update("hero", { videos });
                      }}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => update("hero", { videos: draft.hero.videos.filter((_, idx) => idx !== i) })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => update("hero", { videos: [...draft.hero.videos, ""] })}>
                  <Plus className="mr-2 h-4 w-4" /> Add video
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRODUCTS */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Section heading</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input value={draft.products.badge} onChange={(e) => update("products", { badge: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={draft.products.title} onChange={(e) => update("products", { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea value={draft.products.subtitle} onChange={(e) => update("products", { subtitle: e.target.value })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {draft.products.items.map((item, i) => (
                  <div key={`product-${i}`} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => {
                            const items = [...draft.products.items];
                            items[i] = { ...item, name: e.target.value };
                            update("products", { items });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bangla name</Label>
                        <Input
                          value={item.namebn}
                          onChange={(e) => {
                            const items = [...draft.products.items];
                            items[i] = { ...item, namebn: e.target.value };
                            update("products", { items });
                          }}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => {
                            const items = [...draft.products.items];
                            items[i] = { ...item, description: e.target.value };
                            update("products", { items });
                          }}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <ImageField
                          label="Product image"
                          value={item.image}
                          onChange={(url) => {
                            const items = [...draft.products.items];
                            items[i] = { ...item, image: url };
                            update("products", { items });
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => update("products", { items: draft.products.items.filter((_, idx) => idx !== i) })}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remove product
                    </Button>
                    <Separator />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    update("products", {
                      items: [...draft.products.items, { name: "", namebn: "", description: "", image: "" }],
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" /> Add product
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADVERTS */}
          <TabsContent value="adverts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Section heading</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input value={draft.adverts.badge} onChange={(e) => update("adverts", { badge: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={draft.adverts.title} onChange={(e) => update("adverts", { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Highlighted word</Label>
                  <Input value={draft.adverts.highlight} onChange={(e) => update("adverts", { highlight: e.target.value })} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Subtitle</Label>
                  <Textarea value={draft.adverts.subtitle} onChange={(e) => update("adverts", { subtitle: e.target.value })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advert videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {draft.adverts.videos.map((video, i) => (
                  <div key={`advert-${i}`} className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      value={video.id}
                      placeholder="YouTube link or ID"
                      onChange={(e) => {
                        const videos = [...draft.adverts.videos];
                        videos[i] = { ...video, id: parseYouTubeId(e.target.value) };
                        update("adverts", { videos });
                      }}
                    />
                    <Input
                      value={video.title}
                      placeholder="Title"
                      onChange={(e) => {
                        const videos = [...draft.adverts.videos];
                        videos[i] = { ...video, title: e.target.value };
                        update("adverts", { videos });
                      }}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => update("adverts", { videos: draft.adverts.videos.filter((_, idx) => idx !== i) })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => update("adverts", { videos: [...draft.adverts.videos, { id: "", title: "" }] })}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add advert
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RECIPES */}
          <TabsContent value="recipes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Section heading</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input value={draft.recipes.badge} onChange={(e) => update("recipes", { badge: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={draft.recipes.title} onChange={(e) => update("recipes", { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Highlighted word</Label>
                  <Input value={draft.recipes.highlight} onChange={(e) => update("recipes", { highlight: e.target.value })} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={4}
                    value={draft.recipes.description}
                    onChange={(e) => update("recipes", { description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recipe videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {draft.recipes.videos.map((video, i) => (
                  <div key={`recipe-${i}`} className="flex gap-2">
                    <Input
                      value={video}
                      placeholder="YouTube link or ID"
                      onChange={(e) => {
                        const videos = [...draft.recipes.videos];
                        videos[i] = parseYouTubeId(e.target.value);
                        update("recipes", { videos });
                      }}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => update("recipes", { videos: draft.recipes.videos.filter((_, idx) => idx !== i) })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => update("recipes", { videos: [...draft.recipes.videos, ""] })}>
                  <Plus className="mr-2 h-4 w-4" /> Add recipe video
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
