import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Phone, User, ChevronRight, Loader2, Globe } from "lucide-react";
import { categories as staticCategories } from "@/lib/mockData";
import { useQuery } from "@tanstack/react-query";
import { fetchBusinesses, fetchCategories, fetchSubCategories, BARGAIN_URL } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";


const BusinessCardSkeleton = () => (
  <div className="glass-card rounded-xl p-0 overflow-hidden flex flex-col md:flex-row animate-pulse">
    <div className="flex-1 p-6 space-y-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
    <div className="md:w-64 bg-muted/30" />
  </div>
);

const BusinessSearch = () => {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [subCategoryId, setSubCategoryId] = useState("all");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);

  const { isAuthenticated, token } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["businesses", search, categoryId, subCategoryId, location, page],
    queryFn: () => fetchBusinesses({
      search,
      category_id: categoryId,
      sub_category_id: subCategoryId,
      location,
      page
    }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: subCategoriesData, isLoading: isLoadingSub } = useQuery({
    queryKey: ["sub-categories", categoryId],
    queryFn: () => fetchSubCategories(categoryId),
    enabled: categoryId !== "all",
  });

  // Reset subcategory and page when category changes
  useEffect(() => {
    setSubCategoryId("all");
    setPage(1);
  }, [categoryId]);

  // Reset page when other filters change
  useEffect(() => {
    setPage(1);
  }, [search, subCategoryId, location]);


  const businessesResult = data?.data || [];
  const pagination = data?.pagination;




  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Search */}
      <section className="pt-16">
        <div className="gradient-bg py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Business Search</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                refetch();
              }}
              className="bg-background rounded-xl p-2 flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="What are you looking for?"
                  className="pl-10 border-0 bg-muted/50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="md:w-48 border-0 bg-muted/50">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoriesData?.data?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.category_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {categoryId !== "all" && (
                <Select value={subCategoryId} onValueChange={setSubCategoryId}>
                  <SelectTrigger className="md:w-48 border-0 bg-muted/50">
                    <SelectValue placeholder="All Sub Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sub Categories</SelectItem>
                    {isLoadingSub ? (
                      <SelectItem value="loading" disabled>Loading...</SelectItem>
                    ) : (
                      subCategoriesData?.data?.map((sc: any) => (
                        <SelectItem key={sc.id} value={sc.id}>{sc.sub_category_name}</SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Suburb, State, Postcode"
                  className="pl-10 border-0 bg-muted/50"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button type="submit" className="gradient-bg text-primary-foreground">Search</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm text-muted-foreground mb-6">
            {isLoading ? (
              "Searching..."
            ) : pagination ? (
              `Showing ${Math.min((page - 1) * pagination.limit + 1, pagination.total)} - ${Math.min(page * pagination.limit, pagination.total)} of ${pagination.total} businesses`
            ) : (
              `${businessesResult.length} businesses found`
            )}
          </p>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <BusinessCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-lg text-destructive">Error loading businesses. Please try again later.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {businessesResult.map((business) => (
                <div key={business.id} className="glass-card rounded-xl p-0 overflow-hidden flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{business.category_name}</span>
                    <h3 className="text-xl font-bold text-primary mt-1">{business.business_name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{business.business_address}</span>
                    </div>
                    {business.description && (
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{business.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{business.owner_name || "4.5"}</span>
                      </div>
                      {/* <span className="text-xs text-muted-foreground">({business.reviews || "12"} reviews)</span> */}
                    </div>
                    <div className="flex gap-3 mt-4 flex-wrap">
                      {business.seller_contact && (
                        <a href={`tel:${business.seller_contact}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                          <Phone className="w-4 h-4" /> {business.seller_contact}
                        </a>
                      )}
                      <Link to={`/businesses/${business.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                        <ChevronRight className="w-4 h-4" /> Details
                      </Link>
                      <a
                        href={isAuthenticated && token
                          ? `${BARGAIN_URL}/api/Api_auth/sso?token=${token}&redirect=${encodeURIComponent(`website?com_id=${business.id}`)}`
                          : `${BARGAIN_URL}/website?com_id=${business.id}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 text-secondary-foreground text-sm font-medium hover:bg-secondary/20 transition-colors border border-secondary/20"
                      >
                        <Globe className="w-4 h-4" /> Visit
                      </a>
                    </div>
                  </div>

                  {business.cmap ? (
                    <div className="md:w-64 h-48 md:h-auto overflow-hidden border-l border-border bg-muted/30">
                      {business.cmap.startsWith('http') ? (
                        <iframe
                          src={business.cmap}
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
                          dangerouslySetInnerHTML={{ __html: business.cmap }}
                        />
                      )}
                    </div>
                  ) : (
                    <Link
                      to={`/businesses/${business.id}`}
                      className="md:w-40 bg-primary/5 flex items-center justify-center p-4 hover:bg-primary/10 transition-colors border-l border-border"
                    >
                      <span className="text-sm font-semibold text-primary">View</span>
                    </Link>
                  )}
                </div>
              ))}

              {businessesResult.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">No businesses found matching your search.</p>
                </div>
              )}

              {/* Pagination UI */}
              {pagination && pagination.total_pages > 1 && (
                <div className="mt-10 py-6 border-t border-border">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {Array.from({ length: pagination.total_pages }).map((_, i) => {
                        // Logic to show a limited number of pages
                        if (
                          i === 0 ||
                          i === pagination.total_pages - 1 ||
                          (i >= page - 1 && i <= page + 1)
                        ) {
                          return (
                            <PaginationItem key={i}>
                              <PaginationLink
                                href="#"
                                isActive={page === i + 1}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPage(i + 1);
                                }}
                                className="cursor-pointer"
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          i === 1 ||
                          i === pagination.total_pages - 2
                        ) {
                          return (
                            <PaginationItem key={i}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < pagination.total_pages) setPage(page + 1);
                          }}
                          className={page === pagination.total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    Page {page + 1} of {pagination.total_pages} ({pagination.total} total results)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessSearch;
