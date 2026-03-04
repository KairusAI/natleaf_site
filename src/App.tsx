import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuemSomos from "./pages/QuemSomos";
import Produtos from "./pages/Produtos";
import ProdutoWellness from "./pages/ProdutoWellness";
import ProdutoBrain from "./pages/ProdutoBrain";
import ProdutoSleep from "./pages/ProdutoSleep";
import ConhecaOCBD from "./pages/ConhecaOCBD";
import ParaMedicos from "./pages/ParaMedicos";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/wellness" element={<ProdutoWellness />} />
          <Route path="/produtos/brain" element={<ProdutoBrain />} />
          <Route path="/produtos/sleep" element={<ProdutoSleep />} />
          <Route path="/conheca-o-cbd" element={<ConhecaOCBD />} />
          <Route path="/para-medicos" element={<ParaMedicos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
