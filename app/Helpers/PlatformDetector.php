<?php

namespace App\Helpers;

class PlatformDetector
{
    public static function detect(string $userAgent): array
    {
        $userAgent = strtolower($userAgent);
        
        return [
            'platform' => self::detectPlatform($userAgent),
            'browser' => self::detectBrowser($userAgent),
            'device' => self::detectDevice($userAgent),
        ];
    }
    
    private static function detectPlatform(string $userAgent): string
    {
        $platforms = [
            'android' => 'Android',
            'iphone' => 'iPhone',
            'ipad' => 'iPad',
            'windows nt' => 'Windows',
            'macintosh' => 'macOS',
            'mac os' => 'macOS',
            'linux' => 'Linux',
        ];
        
        foreach ($platforms as $key => $platform) {
            if (str_contains($userAgent, $key)) {
                return $platform;
            }
        }
        
        return 'Unknown';
    }
    
    private static function detectBrowser(string $userAgent): string
    {
        if (str_contains($userAgent, 'chrome') && !str_contains($userAgent, 'edg')) {
            return 'Chrome';
        }
        
        if (str_contains($userAgent, 'firefox')) {
            return 'Firefox';
        }
        
        if (str_contains($userAgent, 'safari') && !str_contains($userAgent, 'chrome')) {
            return 'Safari';
        }
        
        if (str_contains($userAgent, 'edg')) {
            return 'Edge';
        }
        
        return 'Unknown';
    }
    
    private static function detectDevice(string $userAgent): string
    {
        if (str_contains($userAgent, 'mobile') || 
            str_contains($userAgent, 'android') || 
            str_contains($userAgent, 'iphone')) {
            return 'Mobile';
        }
        
        if (str_contains($userAgent, 'tablet') || str_contains($userAgent, 'ipad')) {
            return 'Tablet';
        }
        
        return 'Desktop';
    }
}