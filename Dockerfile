# https://techracho.bpsinc.jp/hachi8833/2023_11_09/116843
# syntax=docker/dockerfile:1

ARG RUBY_VERSION
# さらに、Debianのリリースもパラメータで指定可能にし（デフォルトはbullseye）、
# PostgreSQLなどの他の依存関係と整合する正しい取得元を確実に追加するようにしています。
ARG DISTRO_NAME=bullseye

FROM ruby:$RUBY_VERSION-slim-$DISTRO_NAME

# ここがDockerfileのしくみの厄介な点で、FROM以降では引数がリセットされてしまうので再宣言が必要になります。
ARG DISTRO_NAME

# 共通の依存関係
# ここではコンテナサイズを小さくするためにslimベースのDockerイメージを使っているので、
# 最初に一般的なシステム依存関係（gitやcurlなど）をいくつか手動でインストールしておく必要があります。
# 冒頭3行：
#   目的は容量の節約で、取得したパッケージ ファイルのローカルリポジトリを、ビルドとビルドの間に保存されるキャッシュに移動するためのものです。
#   この特定のDockerレイヤにゴミが残らないようにする（一時ファイルをクリーンアップする）には、パッケージをインストールするすべてのRUNステートメントにこのマジックを含めておく必要があります。
#   これにより、Dockerイメージのビルドも大幅に高速化されます！
#   コマンド解説：
#     Run --mount=type=cache, target=$mount_path(container) [$container_path], sharing=locked/private/share
#     https://docs.docker.com/engine/reference/builder/#run---mount
#     ビルド時にアクセスできるファイルシステムのマウントを作成でき、次のような用途に使える。
#     ・ホストファイルシステムまたは他のビルドステージへのバインドマウントを作成する。
#     ・ビルドシークレットや ssh-agent ソケットへのアクセス。
#     ・永続的なパッケージ管理キャッシュを使用してビルドを高速化する。
#     Mount types
#     ・cache: コンパイラやパッケージ・マネージャ用のディレクトリをキャッシュするための一時ディレクトリをマウントする。
#     ・tmpfs: ビルド・コンテナ内にtmpfs(一時ファイルのためにメモリ上に作成できるFS)をマウントできる。
#     その他のオプション
#     ・sharing: mountの書き込みを共有するかどうかを指定する。lockedは直列的に書き込む
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  --mount=type=tmpfs,target=/var/log \
  rm -f /etc/apt/apt.conf.d/docker-clean; \
  echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache; \
  #  -qq: ログを表示しない
  apt-get update -qq \
  # -y: yesを自動で入力する, -q: 実行時の進捗状況の表示を省略
  # DEBIAN_FRONTEND=noninteractive:
  # あなたとのやりとりは一切なく、すべての質問にデフォルトの答えが使われるようにします。
  # rootにエラーメッセージを送るかもしれませんが、それだけです。それ以外は完全に無音で邪魔にならず、自動インストールのための完璧なフロントエンドです。
  # --no-install-recommends: 推奨パッケージのインストールを無効にする。容量を節約でき、Dockerイメージのサイズも小さくなります
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    gnupg2 \
    curl \
    less \
    git

# PostgreSQLの依存関係をインストール
# ARG PG_MAJOR
# RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
#     gpg --dearmor -o /usr/share/keyrings/postgres-archive-keyring.gpg \
#     && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/postgres-archive-keyring.gpg] https://apt.postgresql.org/pub/repos/apt/" \
#     $DISTRO_NAME-pgdg main $PG_MAJOR | tee /etc/apt/sources.list.d/postgres.list > /dev/null
# RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
#   --mount=type=cache,target=/var/lib/apt,sharing=locked \
#   --mount=type=tmpfs,target=/var/log \
#   apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
#   DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
#     libpq-dev \
#     postgresql-client-$PG_MAJOR

# NodeJSとYarnをインストール
ARG NODE_MAJOR
ARG YARN_VERSION=latest
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    --mount=type=tmpfs,target=/var/log \
    apt-get update && \
    apt-get install -y curl software-properties-common && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo "deb https://deb.nodesource.com/node_${NODE_MAJOR}.x $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends nodejs
RUN npm install -g yarn@$YARN_VERSION

# アプリケーションの依存関係をインストール
# 外部のAptfileを利用して行う（後述）
COPY Aptfile /tmp/Aptfile
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  --mount=type=tmpfs,target=/var/log \
  apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    $(grep -Ev '^\s*#' /tmp/Aptfile | xargs)

# Bundlerの設定
ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

# Bundlerの設定をプロジェクトのルートフォルダに保存する
ENV BUNDLE_APP_CONFIG=.bundle

# `bin/`や`bundle exec`をプレフィックスせずに
# binstubを実行したい場合は以下のコメントを解除する
# 私たちはこの振る舞いをデフォルトでは設定していません。理由は、マルチプロジェクト環境で壊れる可能性があるからです（Railsアプリでローカルなgemやエンジンが使われている場合など）。
# ENV PATH /app/bin:$PATH

# RubyGemをアップグレードして最新のBundlerをインストールする
# 従来はBundlerのバージョンも指定する必要がありました（システムで拾われるように若干のハックを利用します）。
# ありがたいことに、Bundler 2.3.0以降はGemfile.lockのBUNDLED_WITHで定義されているのと同じバージョンのBundlerをわざわざ手動でインストールする必要がなくなりました。
# コンフリクトの回避はBundlerが代わりにやってくれます
RUN gem update --system && \
    gem install bundler

# アプリケーションコード用のディレクトリを作成する
RUN mkdir -p /app
WORKDIR /app

# ポート3000を公開することを明示する
EXPOSE 3000
# デフォルトコマンドをBashにする
CMD ["/bin/bash"]