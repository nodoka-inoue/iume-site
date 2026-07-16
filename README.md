# IUMe website

現役東大生が運営する家庭教師マッチングサービス「IUMe」の公開サイトです。

## Preview

```sh
npm run dev
```

トップページは `index.html`、法務ページは `terms.html` と `privacy.html` です。

## 講師プロフィールの更新

`data/tutors.json` を編集します。空文字 `""` の項目は、サイト上で「情報更新予定」と表示されます。

```json
{
  "nickname": "ニックネーム",
  "faculty": "所属学部",
  "school": "出身校",
  "cramSchool": "利用した塾",
  "subjects": "対応科目",
  "consultation": "得意な相談",
  "teachingStyle": "指導スタイル",
  "introduction": "紹介文"
}
```

