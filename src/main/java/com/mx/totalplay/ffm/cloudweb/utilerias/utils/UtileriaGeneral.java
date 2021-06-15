package com.mx.totalplay.ffm.cloudweb.utilerias.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

//import org.springframework.security.core.context.SecurityContextHolder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.mx.totalplay.ffm.cloudweb.utilerias.model.LoginResult;


@Component
public class UtileriaGeneral {
	
	private static final Logger logger = LogManager.getLogger(UtileriaGeneral.class);
	
	public static String encrypt(String texto) {

        String secretKey = "oaguser";

        String base64EncryptedString = "";

        try {

            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digestOfPassword = md.digest(secretKey.getBytes("utf-8"));
            byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);


            SecretKey key = new SecretKeySpec(keyBytes, "DESede");
            Cipher cipher = Cipher.getInstance("DESede");
            cipher.init(Cipher.ENCRYPT_MODE, key);

            byte[] plainTextBytes = texto.getBytes("utf-8");
            byte[] buf = cipher.doFinal(plainTextBytes);
            byte[] base64Bytes = Base64.getEncoder().encode(buf);
            base64EncryptedString = new String(base64Bytes);

        } catch (Exception ignored) {
        }
        return base64EncryptedString;
    }
	
    public static String desEncrypt(String textoEncriptado) {
        String secretKey = "oaguser";
        String base64EncryptedString = "";
        if (textoEncriptado != null) {
            byte[] message;
            try {

                message = Base64.getDecoder().decode(textoEncriptado.getBytes("utf-8"));

                MessageDigest md = MessageDigest.getInstance("MD5");
                byte[] digestOfPassword = md.digest(secretKey.getBytes("utf-8"));
                byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
                SecretKey key = new SecretKeySpec(keyBytes, "DESede");

                Cipher decipher = Cipher.getInstance("DESede");
                decipher.init(Cipher.DECRYPT_MODE, key);

                byte[] plainText = decipher.doFinal(message);

                base64EncryptedString = new String(plainText, "UTF-8");
            } catch (UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException | BadPaddingException | IllegalBlockSizeException | InvalidKeyException e) {
                e.printStackTrace();
            }
        } else {
            return "";
        }

        return base64EncryptedString;
    }
    
    public LoginResult obtenerObjetoPrincipal() {
		LoginResult auth = (LoginResult) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return auth;
    }
    
    public static byte[] encoderImgNoBase64(String imagePath) {
		byte imageData[]=null;
		//String base64Image = "";
		logger.info("TEST1");
		File file = new File(imagePath);
		try (FileInputStream imageInFile = new FileInputStream(file)) {
			 imageData = new byte[(int) file.length()];
			imageInFile.read(imageData);
			logger.info(".lengt"+imageData.length);
			//base64Image = Base64.getEncoder().encodeToString(imageData);
		} catch (FileNotFoundException e) {
			logger.info("TESTING IMG. " + e);
		} catch (IOException ioe) {
			logger.info("NO SE PUDO PROBAR LA IMAGEN " + ioe);
		}
		
		return imageData;
	}
	
		public static String encoderImg(String imagePath) {

			String base64Image = "";
			File file = new File(imagePath);
			try (FileInputStream imageInFile = new FileInputStream(file)) {
				byte imageData[] = new byte[(int) file.length()];
				imageInFile.read(imageData);
				base64Image = Base64.getEncoder().encodeToString(imageData);
			} catch (FileNotFoundException e) {
				logger.info("No se encontro la imagen. java.io.FileNotFoundException: javax.crypto.IllegalBlockSizeException: Input length must be multiple of 8 when decrypting with padded cipher");
			} catch (IOException ioe) {
				logger.info("Error al leer la imagen " + ioe);
			}
			
			return base64Image;
		}
		
		public static String encoderFile(String fileCode) {
			logger.info("encoder( fileCode: "+fileCode+")");
			String base64File = "";
			try{
				byte[] filebyte =  Base64.getDecoder().decode(fileCode);
				
				String filePath = new String(filebyte);
				File file = new File(filePath);
				try (FileInputStream imageInFile = new FileInputStream(file)) {
					byte imageData[] = new byte[(int) file.length()];
					imageInFile.read(imageData);
					base64File = Base64.getEncoder().encodeToString(imageData);
				} catch (FileNotFoundException e) {
					logger.info("No se encontro el archivo. " + e);
					base64File = "";
				} catch (IOException ioe) {
					logger.info("Error al leer el archivo " + ioe);
					base64File = "";
				}
			}catch(Exception e){
				logger.error("Error ", e);
				base64File = "";
			}
			return base64File;
		}

		public static String nombreArchivo(String fileCode) {
			logger.info("encoder( fileCode: "+fileCode+")");
			String base64File = "";
			byte[] filebyte =  Base64.getDecoder().decode(fileCode);
			String filePath = new String(filebyte);
			File file = new File(filePath);
			try (FileInputStream imageInFile = new FileInputStream(file)) {
				base64File = file.getName();
				logger.info("nombre del camino: "+file.getName());
			} catch (FileNotFoundException e) {
				logger.info("No se encontro el archivo. " + e);
				base64File = "";
			} catch (IOException ioe) {
				logger.info("Error al leer el archivo " + ioe);
				base64File = "";
			}
			return base64File;
		}
}
