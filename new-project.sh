#!/bin/bash

# 🚀 SCRIPT DE CREACIÓN RÁPIDA DE PROYECTOS
# Uso: ./new-project.sh nombre-proyecto "Nombre Proyecto" "Descripción"

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Validar argumentos
if [ $# -lt 2 ]; then
    echo -e "${RED}Error: Faltan argumentos${NC}"
    echo "Uso: ./new-project.sh nombre-proyecto 'Nombre Proyecto' [descripción]"
    echo "Ejemplo: ./new-project.sh growthmx 'GrowthMX' 'Servicios de crecimiento digital'"
    exit 1
fi

PROJECT_SLUG=$1
PROJECT_NAME=$2
PROJECT_DESC=${3:-"Servicios digitales en México"}
TEMPLATE_DIR="/root/.openclaw/workspace/repos/socialmexico-template"
NEW_DIR="/root/.openclaw/workspace/repos/$PROJECT_SLUG"

echo -e "${BLUE}🏭 Fábrica de Proyectos${NC}"
echo "======================"
echo ""

# Verificar que existe el template
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo -e "${RED}❌ Error: No se encuentra el template${NC}"
    exit 1
fi

# Verificar que no existe el proyecto
if [ -d "$NEW_DIR" ]; then
    echo -e "${RED}❌ Error: El proyecto '$PROJECT_SLUG' ya existe${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Creando proyecto: $PROJECT_NAME${NC}"
echo "Slug: $PROJECT_SLUG"
echo "Descripción: $PROJECT_DESC"
echo ""

# 1. Copiar template
echo -e "${BLUE}1/6 Copiando template...${NC}"
cp -r "$TEMPLATE_DIR" "$NEW_DIR"

# 2. Limpiar archivos de git y build anteriores
echo -e "${BLUE}2/6 Limpiando archivos temporales...${NC}"
cd "$NEW_DIR"
rm -rf .git dist node_modules .vercel

# 3. Reemplazar nombres en archivos
echo -e "${BLUE}3/6 Personalizando archivos...${NC}"
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.json" -o -name "*.html" -o -name "*.xml" -o -name "*.md" \) -exec sed -i "s/SocialMexico/$PROJECT_NAME/g" {} \;
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.json" -o -name "*.html" -o -name "*.xml" -o -name "*.md" \) -exec sed -i "s/socialmexico/$PROJECT_SLUG/g" {} \;
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.json" -o -name "*.html" -o -name "*.xml" -o -name "*.md" \) -exec sed -i "s/socialmexico.com.mx/$PROJECT_SLUG.vercel.app/g" {} \;

# 4. Actualizar package.json
echo -e "${BLUE}4/6 Actualizando package.json...${NC}"
node -e "
const pkg = require('./package.json');
pkg.name = '$PROJECT_SLUG';
pkg.description = '$PROJECT_DESC';
pkg.version = '1.0.0';
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# 5. Instalar dependencias
echo -e "${BLUE}5/6 Instalando dependencias...${NC}"
npm install --silent

# 6. Setup git
echo -e "${BLUE}6/6 Configurando git...${NC}"
git init
git add .
git commit -m "Initial commit: $PROJECT_NAME from template"

echo ""
echo -e "${GREEN}✅ Proyecto '$PROJECT_NAME' creado exitosamente!${NC}"
echo ""
echo "📁 Ubicación: $NEW_DIR"
echo "🚀 Para deployar:"
echo "   cd $NEW_DIR"
echo "   vercel --prod"
echo ""
echo "⚙️  Próximos pasos:"
echo "   1. Editar src/data/config.ts"
echo "   2. Reemplazar public/logo.png"
echo "   3. Personalizar src/pages/Index.tsx"
echo "   4. npm run build && vercel --prod"
echo ""
