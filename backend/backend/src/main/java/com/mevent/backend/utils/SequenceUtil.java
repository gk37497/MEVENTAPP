package com.mevent.backend.utils;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SequenceUtil {
	
	private static final AtomicLong SEQ = new AtomicLong(System.currentTimeMillis());
    private static final SecureRandom random = new SecureRandom();
    private static final String LETTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String HEX = "0123456789ABCDEF";
    
    public static long nextId() {
        return SEQ.incrementAndGet();
    }

    public static String systemTraceNumber(){
    	return String.format("%06d", random.nextInt(999999));
    }
    
    public static String generateQrCode(String prefix) {
        return prefix + Long.toString(SEQ.incrementAndGet());
    }

    public static String randomUuid() {
        return UUID.randomUUID().toString();
    }

    public static String nextTokenId() {
        return new BigInteger(130, random).toString(32);
    }

    public static String nextVactId() {
        return new BigInteger(100, random).toString(36);
    }
    
//    public static String generateQrCode() {
//        Random random = new Random();
//        char[] digits = new char[8];
//        for (int i = 0; i < 8; i++) {
//            digits[i] = (char)(random.nextInt(10)+'0');
//        }
//        return String.valueOf(digits);
//    }
    
    public static String generateBarCode() {
        Random random = new Random();
        int[] digits = new int[16];
        for (int i = 0; i < 16; i++) {
            digits[i] = (int)(random.nextInt(10)+'0');
        }
        return Arrays.toString(digits);
    }
    
    public static String generateLetter(int length) {
        
        final int N = LETTER.length();

        Random r = new Random();
        String randomString = "";
        for (int i = 0; i < length; i++) {
            randomString += LETTER.charAt(r.nextInt(N));
        }

        return randomString;
    }
    
    public static String generateToken() {
    	String token = String.format("%04d", random.nextInt(10000));
    	return token;
    }
    
//    public static String generateQrCode(){
//    	Random rnd = new Random();
//    	Integer pass = 1000 + rnd.nextInt(8999);
//    	return pass.toString();
//    }
    
    public static String generateHexString(int length){
    	final int N = HEX.length();

        Random r = new Random();
        String randomString = "";
        for (int i = 0; i < length; i++) {
            randomString += HEX.charAt(r.nextInt(N));
        }

        return randomString;
    } 
}
