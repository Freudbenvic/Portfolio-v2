# Portfolio de Freud Joslin Bossou

Portfolio personnel de développeur full-stack : une seule page, thème sombre, bilingue (français / anglais), installable comme application et équipé d'un assistant de chat qui répond aux visiteurs.

<br>

## Ce que contient le site

- **Accueil** avec les rôles qui défilent
- **À propos**, **Compétences** (grille filtrable par catégorie) et **Parcours** (études et expérience)
- **Services** en cartes numérotées
- **Projets** en carrousel infini : on fait défiler à la souris, au doigt ou au trackpad, et après le dernier projet on revient au premier
- **Contact** et téléchargement du CV
- **Chat assistant** branché sur le contenu du site
- **Installable** sur téléphone et ordinateur (PWA), avec un bouton « Installer l'application » dans le menu mobile et le pied de page, sans fenêtre qui gêne la lecture
- **Sélecteur FR / EN** replié sur le bord droit

<br>

## Technologies

| Domaine | Outils |
| --- | --- |
| Interface | React 19, TypeScript, Vite |
| Style | Tailwind CSS, lucide-react |
| Application installable | vite-plugin-pwa |
| Chat (backend) | Fonction Vercel `api/chat.ts` |
| Hébergement | Vercel |

<br>

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est alors disponible sur http://localhost:5173

Les autres commandes utiles :

```bash
npm run build     # vérifie les types et construit le site dans dist/
npm run preview   # prévisualise le site construit
npm run lint      # analyse du code
```

> Le chat ne répond pas avec `npm run dev`, car c'est une fonction Vercel. Il fonctionne une fois le site déployé, ou en local avec `vercel dev`.

<br>

## Où modifier quoi

| Je veux changer | Fichier |
| --- | --- |
| Ma bio, mes projets, mes compétences, mon parcours, mes services | `src/data/content.ts` |
| Les textes de l'interface (titres, boutons) et les rôles de l'accueil | `src/i18n/translations.ts` |
| Mon CV | `public/cv-freud-benvic.pdf` (garder le même nom) |
| Les images des projets | `src/assets/projects/` |
| Les couleurs et les polices | `tailwind.config.js` |

Le fichier `content.ts` alimente aussi le chat : le site et l'assistant restent toujours d'accord.

**Ajouter un projet :** ajoute un bloc dans la liste `projects` de `content.ts`, puis une image dans `src/assets/projects/` si tu en as une.

**Ajouter une compétence :** ajoute-la dans `skills` de `content.ts` avec sa catégorie, puis associe son icône dans `src/components/Skills.tsx`.

<br>

## Structure du projet

```
api/chat.ts            le chat (fonction Vercel)
public/                CV, icônes, image de partage, sitemap
src/
  components/          une section = un composant
  context/             gestion de la langue
  data/content.ts      tout le contenu du site
  i18n/translations.ts textes en français et en anglais
  assets/              logos, images, icônes
```

<br>

## Le chat et son backend

Il n'y a rien à créer à part : le fichier `api/chat.ts` est une **fonction Vercel**. Elle est déployée automatiquement avec le site et répond à l'adresse `/api/chat`.

Elle reçoit les messages des visiteurs, les envoie à **OpenRouter** avec les informations de `content.ts`, puis renvoie la réponse. Par défaut, elle utilise le modèle `openrouter/free`, qui choisit lui-même un modèle gratuit disponible à chaque message. Elle peut aussi t'envoyer un email à chaque échange.

Pour rendre le chat fiable avec ce modèle changeant, la fonction :

- réessaie jusqu'à 3 fois si OpenRouter est occupé ou si le modèle répond à côté (par exemple un simple « safe » venu d'un modèle de modération) ;
- retire le markdown et les tirets cadratins des réponses, car le chat affiche du texte simple ;
- écarte toute réponse qui recopierait ses propres consignes ;
- limite l'historique envoyé (10 derniers messages) pour rester rapide.

**Ses consignes** (périmètre, ton, langue, confidentialité, refus des sujets hors portfolio) se trouvent dans la fonction `buildSystemPrompt` de `api/chat.ts`. C'est là qu'il faut les ajuster si le chat répond mal.

**La commande `/aide`** (ou `/help`) aide un visiteur qui ne sait pas par où commencer. Un bouton cliquable est affiché sous le message d'accueil, et la commande peut aussi être tapée. Elle liste ce que l'assistant sait faire et propose des questions toutes prêtes sur lesquelles cliquer. Elle est traitée directement dans le navigateur : elle ne coûte rien, ne compte pas dans les 15 questions et n'est jamais envoyée au serveur. Le texte et les suggestions se modifient dans `ChatWidget.tsx`.

**Les limites du chat** protègent ton quota gratuit et évitent les abus :

| Limite | Valeur | Où la changer |
| --- | --- | --- |
| Taille d'une question | 300 caractères (500 côté serveur) | `MAX_INPUT` dans `ChatWidget.tsx`, `MAX_USER_CHARS` dans `api/chat.ts` |
| Questions par visite | 15, puis le chat propose ton email et ton WhatsApp | `MAX_QUESTIONS` dans `ChatWidget.tsx` |
| Délai entre deux messages | 3 secondes | `COOLDOWN_MS` dans `ChatWidget.tsx` |
| Requêtes par adresse IP | 30 toutes les 10 minutes | `RATE_LIMIT` et `RATE_WINDOW_MS` dans `api/chat.ts` |
| Emails de notification | 1 par visite, à la première question | `api/chat.ts` |

La limite par adresse IP est volontairement large, car beaucoup de gens partagent la même adresse sur les réseaux mobiles. Elle freine les rafales mais ne remplace pas une vraie protection : si un jour tu subis des abus, il faudra un petit compteur partagé (une base de données gratuite). Quand une limite est atteinte, ou que les modèles gratuits sont saturés, le visiteur voit des boutons Email et WhatsApp au lieu d'une simple excuse.

Elle a besoin de clés et de réglages, à enregistrer dans Vercel :

| Variable | Obligatoire | Rôle |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Oui | Fait répondre le chat |
| `OPENROUTER_MODEL` | Non | Change le modèle (par défaut `openrouter/free`) |
| `RESEND_API_KEY` | Non | Envoie un email à chaque message reçu |

Sans `RESEND_API_KEY`, le chat marche très bien, seules les notifications sont désactivées.

**Où les ajouter :** projet Vercel, **Settings**, **Environment Variables**. Après l'ajout, lance un **Redeploy** pour qu'elles soient prises en compte.

**Vérifier que le chat fonctionne :**

```bash
curl -X POST https://TON-SITE.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Bonjour"}]}'
```

- Une réponse avec `reply` : tout fonctionne.
- L'erreur `missing API key` : la clé n'est pas enregistrée, ou le redéploiement n'a pas été fait.
- L'erreur `Upstream chat error` : OpenRouter n'a pas répondu après 3 essais (modèles gratuits saturés, limite atteinte ou clé refusée). Réessaie un peu plus tard.

Les modèles gratuits ont des limites de requêtes, et leur disponibilité varie. Les journaux se trouvent dans Vercel, onglet **Logs**.

<br>

## Déployer sur Vercel

1. Pousse le projet sur un dépôt GitHub.
2. Sur vercel.com, clique sur **Add New**, puis **Project**, et importe le dépôt.
3. Vercel reconnaît Vite tout seul (commande `npm run build`, dossier `dist`).
4. Avant de lancer le déploiement, ajoute les variables d'environnement ci-dessus.
5. Clique sur **Deploy**.

Chaque `git push` sur la branche principale redéploie ensuite le site automatiquement.

<br>

## Performance

Le site est pensé pour les connexions mobiles lentes :

- **Images en WebP**, redimensionnées à la taille réellement affichée (le portrait existe en deux tailles, le navigateur choisit la bonne).
- **Chargement différé** des images situées plus bas dans la page.
- **Polices hébergées avec le site** (Inter et Space Grotesk, via `@fontsource-variable`), sans passer par Google Fonts.
- **Précache léger** : le service worker ne télécharge en arrière-plan que l'essentiel, pas le CV ni l'image de partage.

Pour ajouter une image, convertis-la en WebP (largeur 800 px suffit pour une couverture de projet) avant de la placer dans `src/assets/`. Une image de plusieurs centaines de Ko pèse lourd sur un téléphone.

<br>

## Mesurer les visites

Le site embarque le compteur de visites de Vercel (`@vercel/analytics`, composant `<Analytics />` dans `src/App.tsx`). Il est anonyme et ne compte rien en local.

Pour l'activer : dans Vercel, ouvre ton projet, onglet **Analytics**, et active-le. Après le prochain déploiement, les visites apparaissent dans cet onglet : nombre de visiteurs, pages vues, pays, appareils et sites d'origine (par exemple Facebook ou WhatsApp). Les intitulés peuvent varier un peu d'une version de Vercel à l'autre, et l'offre gratuite a une limite mensuelle à vérifier chez eux.

<br>

## Design

- Thème sombre uniquement : fond `#0a0a0f`, accent violet `#7c5cff`
- Titres en Space Grotesk, texte en Inter
- Pensé pour le téléphone comme pour l'ordinateur
