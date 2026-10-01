# 受注管理システム

画面設計（ログイン／受注一覧／受注 新規作成）と同じ UI/UX で実装した React + TypeScript + Vite アプリです。

## 起動

```bash
npm install
npm run dev
```

## 機能
- ログイン（社員ID・パスワード入力。現状は入力があればログイン可。認証APIは `src/pages/Login.tsx` の TODO で接続）
- 受注一覧（納期順、品名クリックで編集）
- 受注 新規作成・編集・削除（品名・得意先・数量・納期・備考の5項目、必須チェック付き）
- データはブラウザの localStorage に保存（`src/store.ts`）
