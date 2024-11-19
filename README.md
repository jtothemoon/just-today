# Just Today

하루 단위로 초기화되는 Todo 애플리케이션입니다. 설정한 시간이 되면 자동으로 초기화되어 매일 새로운 마음으로 시작할 수 있습니다.

## 주요 기능

### ⏰ 시간 기반 초기화
- 사용자가 설정한 시간에 자동으로 Todo 목록 초기화
- 다음 초기화까지 남은 시간 표시

### ✅ Todo 관리
- Todo 추가/수정/삭제
- 완료 체크
- 최대 Todo 개수 설정 및 제한 (1-10개)
- 드래그 앤 드롭으로 순서 변경
- 우선순위 설정 및 편집 (높음/중간/낮음)
- 우선순위/생성/완료 순으로 정렬

### 🔔 알림
- 작업 완료시 알림 메시지
- Todo 추가/수정/삭제시 상태 알림

### 💫 기타
- 모바일 친화적 UI
- 완료된 항목 숨기기/보이기
- 완료된 항목만 삭제
- 수동 초기화 기능
- 전체 삭제 기능

## 기술 스택

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Vite
- DnD Kit (드래그 앤 드롭)
- React Hot Toast (알림)
- React Responsive (반응형)

## 데모

[https://just-today.vercel.app](https://just-today.vercel.app)

## 시작하기

```bash
# 저장소 클론
git clone https://github.com/jtothemoon/just-today.git

# 디렉토리 이동
cd just-today

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev