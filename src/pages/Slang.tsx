import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Volume2, MapPin, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppMenu from '@/components/AppMenu';
import LanguageSelector from '@/components/LanguageSelector';

interface SlangItem {
  word: string;
  translation: string;
  explanation: string;
  example: string;
  exampleTranslation: string;
  pronunciation?: string;
}

export default function Slang() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const slangCategories = t('slang.categories', { returnObjects: true }) as Record<string, { name: string; items: SlangItem[] }>;
  const rioWords = t('slang.rioWords', { returnObjects: true }) as SlangItem[];
  const emergencyPhrases = t('slang.emergency', { returnObjects: true }) as SlangItem[];

  const filterItems = (items: SlangItem[]) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
              {t('slang.title')}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <AppMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
            {t('slang.hero.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('slang.hero.subtitle')}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-2 border-primary/20 shadow-lg">
          <CardContent className="pt-6">
            <p className="text-foreground leading-relaxed">
              {t('slang.introduction')}
            </p>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder={t('slang.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Slang Categories */}
        <div className="space-y-8 mb-12">
          {Object.entries(slangCategories).map(([key, category]) => {
            const filteredItems = filterItems(category.items);
            if (filteredItems.length === 0 && searchTerm) return null;

            return (
              <div key={key}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {category.name}
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredItems.map((item, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl flex items-center justify-between">
                          <span className="text-primary">{item.word}</span>
                          {item.pronunciation && (
                            <Badge variant="secondary" className="text-xs">
                              {item.pronunciation}
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-base font-medium">
                          {item.translation}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">{item.explanation}</p>
                        <Separator />
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">💬 {item.example}</p>
                          <p className="text-xs text-muted-foreground italic">{item.exampleTranslation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rio-Only Words */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t('slang.rioWordsTitle')}
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {filterItems(rioWords).map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{item.word}</CardTitle>
                  <CardDescription>{item.translation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.explanation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Phrases */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              {t('slang.emergencyTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyPhrases.map((phrase, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
                  <p className="font-bold text-lg mb-1">{phrase.word}</p>
                  <p className="text-muted-foreground mb-2">{phrase.translation}</p>
                  <div className="text-sm bg-muted/50 p-2 rounded">
                    <p className="font-medium">{phrase.example}</p>
                    <p className="text-muted-foreground italic text-xs mt-1">{phrase.exampleTranslation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cultural Tips */}
        <Card className="mt-8 border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-950/20 dark:to-green-950/20">
          <CardHeader>
            <CardTitle className="text-xl">💡 {t('slang.culturalTips.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(t('slang.culturalTips.tips', { returnObjects: true }) as string[]).map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
