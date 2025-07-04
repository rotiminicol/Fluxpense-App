
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Download, Loader2, Share2, PieChart, BarChart3, ArrowLeft, Filter, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isWithinInterval } from "date-fns";
import type { DateRange } from "react-day-picker";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useData } from "@/contexts/data-context";


const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

function ReportsSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-28 w-full" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <Skeleton className="lg:col-span-2 h-80" />
                <Skeleton className="lg:col-span-3 h-80" />
            </div>
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

const DesktopReports = React.memo(function DesktopReports() {
    const { expenses, categories } = useData();
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedVendor, setSelectedVendor] = useState<string>('all');
  
    const filteredExpenses = useMemo(() => {
      return expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const inDateRange = dateRange?.from && dateRange?.to ? isWithinInterval(expenseDate, { start: dateRange.from, end: dateRange.to }) : true;
        const inCategory = selectedCategory === 'all' || expense.category_id === parseInt(selectedCategory);
        const inVendor = selectedVendor === 'all' || expense.vendor === selectedVendor;
        return inDateRange && inCategory && inVendor;
      });
    }, [expenses, dateRange, selectedCategory, selectedVendor]);
  
    const { categoryBreakdown, vendorSpend } = useMemo(() => {
      const categoryBreakdown = filteredExpenses.reduce((acc, expense) => {
          const catName = expense.category?.name || "Uncategorized";
          acc[catName] = (acc[catName] || 0) + expense.amount;
          return acc;
      }, {} as Record<string, number>);
  
      const vendorSpend = filteredExpenses.reduce((acc, expense) => {
          acc[expense.vendor] = (acc[expense.vendor] || 0) + expense.amount;
          return acc;
      }, {} as Record<string, number>);
  
      return { 
          categoryBreakdown: Object.entries(categoryBreakdown).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount),
          vendorSpend: Object.entries(vendorSpend).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount),
      };
    }, [filteredExpenses]);
  
    const vendors = useMemo(() => [...new Set(expenses.map(e => e.vendor))], [expenses]);
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
              <p className="text-muted-foreground">Gain insights into your spending patterns.</p>
            </div>
            <Link href="/dashboard/overview">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
              </Button>
            </Link>
        </div>

        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Filter className="text-primary"/> Filter Report</CardTitle>
            <CardDescription>Select filters to generate a new report.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[300px] justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
  
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Vendor" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                {vendors.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
  
            <Button className="md:ml-auto button-glow">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </CardContent>
        </Card>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card className="lg:col-span-2 glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '150ms'}}>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><PieChart className="text-primary"/>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={categoryBreakdown.slice(0, 5)} layout="horizontal" margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" type="category" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis dataKey="amount" type="number" tickFormatter={(value) => `$${value}`} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                          <RechartsTooltip cursor={{fill: 'hsl(var(--primary) / 0.1)'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                              {categoryBreakdown.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                          </Bar>
                      </RechartsBarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
          <Card className="lg:col-span-3 glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '300ms'}}>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart3 className="text-accent"/>Spend by Vendor</CardTitle>
              </CardHeader>
              <CardContent>
                   <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={vendorSpend.slice(0, 10)} layout="vertical" margin={{ left: 30, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} interval={0} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                          <RechartsTooltip cursor={{fill: 'hsl(var(--accent) / 0.1)'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                          <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                      </RechartsBarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
        </div>
        
        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '450ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="text-blue-500"/>Filtered Expenses ({filteredExpenses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-primary/5">
                    <TableCell className="font-medium">{expense.vendor}</TableCell>
                    <TableCell>{expense.category?.name || 'N/A'}</TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">{JSON.parse(expense.items || '[]').join(', ')}</TableCell>
                    <TableCell className="text-right font-semibold">${expense.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {filteredExpenses.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No expenses found for the selected filters.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
});

const MobileReports = React.memo(function MobileReports() {
  const { expenses, budgets } = useData();

  const { totalSpent, totalBudget, categoryBreakdown, spendingByMonth } = useMemo(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    
    const categoryBreakdown = Object.entries(
      expenses.reduce((acc, expense) => {
        const catName = expense.category?.name || 'Uncategorized';
        acc[catName] = (acc[catName] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);

    const spendingByMonth = expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const lastSixMonths = [...Array(6)].map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    const spendingData = lastSixMonths.map(month => ({
      name: month,
      total: spendingByMonth[month] || 0,
    }));
    
    return { totalSpent, totalBudget, categoryBreakdown, spendingByMonth: spendingData };
  }, [expenses, budgets]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Your financial insights at a glance</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center glassmorphism border-primary/20">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-xl font-bold text-primary">${totalSpent.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="text-center glassmorphism border-accent/20">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Budget Used</p>
            <p className="text-xl font-bold text-accent">{totalBudget > 0 ? `${Math.round((totalSpent / totalBudget) * 100)}%` : 'N/A'}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PieChart className="w-5 h-5 text-primary" />
            Spending by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie data={categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="hsl(var(--primary))">
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryBreakdown.slice(0, 3).map((item, index) => (
              <div key={item.name} className="flex items-center text-sm">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="flex-1 text-muted-foreground">{item.name}</span>
                <span className="font-medium">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5 text-accent" />
            Monthly Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsBarChart data={spendingByMonth}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
              <Bar dataKey="total" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1 button-glow">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
});

export function Reports() {
    const isMobile = useIsMobile();
    const { loading } = useData();

    if (loading) {
        return <ReportsSkeleton />
    }

    return isMobile ? <MobileReports /> : <DesktopReports />;
}
