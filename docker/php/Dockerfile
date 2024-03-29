FROM php:8.0-fpm

# Copy composer.lock and composer.json
COPY ../../core/composer.lock ../../core/composer.json /var/www/html/

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    libzip-dev \
    libonig-dev\
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html/

# Copy existing application directory contents
COPY ../../core/ /var/www/html

# Create user 
RUN useradd -ms /bin/bash admin

# Give premissson to the user
RUN chown -R admin:admin /var/www/html/
RUN chmod 755 /var/www/html/
USER admin

# Expose port 9000 and start php-fpm server
EXPOSE 9000

RUN composer install
