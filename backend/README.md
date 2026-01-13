<!-- 仮想環境作成 -->
python -m venv venv

venv\Scripts\activate

<!-- 依存関係DL -->
pip install -r requirements.txt

<!-- 実行 -->
uvicorn api.main:app --reload

<!-- FastAPI -->
http://127.0.0.1:8000/docs