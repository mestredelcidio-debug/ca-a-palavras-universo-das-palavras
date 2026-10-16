# Guia de Configuração e Integração Start.io (Android / Capacitor)

Este documento detalha a arquitetura e os passos necessários para integrar o SDK nativo da **Start.io** (App ID: `209408840`) no aplicativo Android gerado via Capacitor para o jogo **Caça-Palavras: Universo das Palavras**.

---

## 1. O que foi Implementado

1. **Camada de Serviço (`src/services/AdManager.ts`)**:
   - Fornece métodos padronizados para exibir vídeos recompensados (`showRewarded`), interstitials (`showInterstitial`), e gerenciar banners (`loadBanner`, `hideBanner`).
   - Detecta automaticamente se está rodando em ambiente nativo Android (via Capacitor) ou em ambiente Web/Preview.
   - Requer confirmação real de conclusão do vídeo para conceder recompensas.

2. **Integração NATIVA Android**:
   - **App ID Start.io**: `209408840` configurado no `AndroidManifest.xml` e no build.
   - **Repositório Maven**: Configurado para baixar o SDK oficial da Start.io.
   - **Plugin Capacitor (`StartIoPlugin.java`)**: Ponte entre as chamadas TypeScript do React e as APIs nativas da Start.io em Java/Kotlin.

3. **Proteção contra Recompensas Falsas**:
   - As caixas de moedas e itens da loja exigem a conclusão real do anúncio recompensado.

---

## 2. Configuração do SDK no Android

### A. Dependência Maven (`android/app/build.gradle`)
Certifique-se de que o repositório Maven da Start.io está presente no `build.gradle` do app:
```gradle
repositories {
    maven { url "https://maven.start.io" }
}

dependencies {
    implementation 'com.startapp:inapp-sdk:5.1.0'
}
```

### B. Configuração no `AndroidManifest.xml`
Insira o App ID `209408840` dentro da tag `<application>`:
```xml
<meta-data
    android:name="com.startapp.sdk.APPLICATION_ID"
    android:value="209408840" />

<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```

---

## 3. Como Sincronizar, Compilar e Testar

1. **Sincronizar os assets web com o projeto nativo**:
   ```bash
   npm run build
   npx cap sync
   ```

2. **Abrir o projeto no Android Studio**:
   ```bash
   npx cap open android
   ```

3. **Compilar e Rodar**:
   - Conecte um dispositivo Android via USB (com Depuração USB ativada) ou abra no Emulador.
   - Clique em **Run** no Android Studio.

---

## 4. Testes e Modo de Teste da Start.io

Conforme a documentação oficial da Start.io:
- Para testar anúncios em ambiente de desenvolvimento, utilize o App ID de teste da Start.io (se necessário) ou verifique os logs no Logcat filtrando por `StartApp` ou `StartIoPlugin`.
- Certifique-se de que o dispositivo possui conexão com a internet para carregar os criativos de anúncio.
